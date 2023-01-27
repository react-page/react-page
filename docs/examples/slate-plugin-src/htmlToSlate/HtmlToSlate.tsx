import flatten from 'lodash.flatten';
import { jsx } from 'slate-hyperscript';
import type { SlatePlugin } from '../types/SlatePlugin';
import type { SlateState } from '../types/state';
import parseHtml from './parseHtml';

const HtmlToSlate = ({ plugins }: { plugins: SlatePlugin[] }) => {
  const deserializeElement = (el: Node) => {
    const nodename = el.nodeName.toUpperCase();

    if (el.nodeType === 3) {
      return el.textContent;
    } else if (el.nodeType !== 1) {
      return null;
    } else if (nodename === 'BR') {
      return '\n';
    }

    const { nodeName } = el;
    const parent = el;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const children: any[] = flatten(
      Array.from(parent.childNodes).map(deserializeElement)
    );

    if (nodename === 'BODY') {
      return jsx('fragment', {}, children);
    }

    const matchingPlugin = plugins.find((p) => {
      return (
        p.pluginType === 'component' &&
        p.deserialize?.tagName === nodeName.toLowerCase()
      );
    });
    if (matchingPlugin && matchingPlugin.pluginType === 'component') {
      const elHtml = el as HTMLElement;
      if (!elHtml.style) {
        // xmldom has no style attribute
        // we monkey patch it in for easier style parsing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (elHtml as any).style = new (require('cssstyle').CSSStyleDeclaration)();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (elHtml.style as any).cssText = elHtml.getAttribute('style');
      }
      if (matchingPlugin.object === 'mark') {
        const attrs = {
          [matchingPlugin.type]:
            matchingPlugin?.deserialize?.getData?.(elHtml) ?? true,
        };

        return children.map((child) => jsx('text', attrs, child));
      } else {
        const data = matchingPlugin?.deserialize?.getData?.(elHtml);
        const attrs = {
          type: matchingPlugin.type,
          ...(data ? { data } : {}), // don't add data if its empty
        };
        return jsx('element', attrs, children);
      }
    }

    return children;
  };

  return (htmlString: string): SlateState => {
    const parsed = parseHtml('<body>' + htmlString + '</body>');

    const fragment = deserializeElement(
      parsed.documentElement
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as unknown as any[];
    const nodes = Array.isArray(fragment) ? fragment : [fragment];
    // filter empty nodes (that contain only text)
    return {
      slate: nodes.filter((n) => n.text?.trim() !== '' ?? true),
    };
  };
};

export default HtmlToSlate;
