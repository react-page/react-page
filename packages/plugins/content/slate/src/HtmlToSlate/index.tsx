import flatten from 'lodash.flatten';
import { jsx } from 'slate-hyperscript';
import { SlateState } from 'src/types/state';
import { SlatePlugin } from '../types/SlatePlugin';
import parseHtml from './parseHtml';

const HtmlToSlate = ({ plugins }: { plugins: SlatePlugin[] }) => {
  const deserializeElement = (el: Node) => {
    if (el.nodeType === 3) {
      return el.textContent && el.textContent.replace('\n', '');
    } else if (el.nodeType !== 1) {
      return null;
    } else if (el.nodeName === 'BR') {
      return '\n';
    }

    const { nodeName } = el;
    let parent = el;

    // tslint:disable-next-line: no-any
    let children: any[] = flatten(
      Array.from(parent.childNodes).map(deserializeElement)
    );

    if (el.nodeName === 'BODY') {
      return jsx('fragment', {}, children);
    }

    const matchingPlugin = plugins.find(p => {
      return (
        p.pluginType === 'component' &&
        p.deserialize?.tagName === nodeName.toLowerCase()
      );
    });
    if (matchingPlugin && matchingPlugin.pluginType === 'component') {
      if (matchingPlugin.object === 'mark') {
        const attrs = {
          [matchingPlugin.type]:
            matchingPlugin?.deserialize?.getData?.(el as HTMLElement) ?? true,
        };

        return children.map(child => jsx('text', attrs, child));
      } else {
        const attrs = {
          type: matchingPlugin.type,
          ...(matchingPlugin?.deserialize?.getData?.(el as HTMLElement) ?? {}),
        };
        return jsx('element', attrs, children);
      }
    }

    return children;
  };

  return (htmlString: string): SlateState => {
    const parsed = parseHtml(htmlString);

    // tslint:disable-next-line:no-any
    let fragment = (deserializeElement(parsed.body) as unknown) as any[];

    return {
      slate: fragment,
    };
  };
};

export default HtmlToSlate;
