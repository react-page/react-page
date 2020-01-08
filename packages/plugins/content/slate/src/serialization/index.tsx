import { PluginProps } from '@react-page/core/lib/service/plugin/classes';
import { EditorState } from '@react-page/core/lib/types/editor';
import { jsx } from 'slate-hyperscript';
import { SlatePlugin } from 'src/types/SlatePlugin';
import { SlatePluginDefinition } from 'src/types/slatePluginDefinitions';
import parseHtml from '../parseHtml/parseHtml';
import { SlateState } from '../types/state';

type AdditionalSlateFunctions = {
  slateToHtml: (editorState: EditorState) => string;
  htmlToSlate: (html: string) => EditorState;
};
export type SerializationFunctions = Pick<
  PluginProps<SlateState>,
  'serialize' | 'unserialize'
> &
  AdditionalSlateFunctions;

// tslint:disable-next-line:no-any
const makePluginDeserializer = (plugin: SlatePluginDefinition<any>) => {
  if (plugin.pluginType === 'component') {
    // tslint:disable-next-line:no-any
    return (el: HTMLElement, next: (childnodes: any) => any) => {
      const tagName = el.tagName.toLowerCase();
      if (tagName !== plugin.deserialize.tagName) {
        return;
      }
      return {
        object: plugin.object,
        type: plugin.type,
        nodes: next(el.childNodes),
        data: plugin.deserialize.getData
          ? plugin.deserialize.getData(el)
          : undefined,
      };
    };
  }
  return null;
};

const checkEmpty = potentialString =>
  !(
    potentialString &&
    typeof potentialString === 'string' &&
    potentialString.length > 0 &&
    !/^(\r\n|\r|\n)$/.test(potentialString)
  );

export default ({
  createInitialState,
  plugins,
}: {
  // tslint:disable-next-line:no-any
  createInitialState?: () => any;
  plugins: SlatePlugin[];
}) => {
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
    let children: any[] = Array.from(parent.childNodes).map(deserializeElement);

    if (el.nodeName === 'BODY') {
      if (!checkEmpty(children[0])) {
        children.slice(1);
      }
      if (checkEmpty(children[children.length - 1])) {
        children.pop();
      }
      return jsx('fragment', {}, children);
    }

    const matchingPlugin = plugins.find(p => {
      return (
        p.pluginType === 'component' &&
        p.deserialize &&
        p.deserialize.tagName === nodeName.toLowerCase()
      );
    });

    if (matchingPlugin && matchingPlugin.pluginType === 'component') {
      const attrs = matchingPlugin.deserialize.getData(el as HTMLElement);
      return jsx(
        matchingPlugin.object === 'mark' ? 'text' : 'element',
        attrs,
        children
      );
    }

    return children;
  };

  const htmlToSlate = (htmlString: string) => {
    const parsed = parseHtml(htmlString);
    const rules = plugins
      .filter(p => p.pluginType === 'component')
      .map(p => ({
        deserialize: makePluginDeserializer(p),
      }));

    return;
  };

  const unserialize = ({
    importFromHtml,
    serialized,
    editorState,
    ...rest
  }: // tslint:disable-next-line:no-any
  SlateState): SlateState => {
    if (serialized) {
      // tslint:disable-next-line:no-any
      return { editorState: serialized, ...rest };
    } else if (importFromHtml) {
      return { editorState: htmlToSlate(importFromHtml), ...rest };
    } else if (editorState) {
      return { editorState, ...rest };
    }

    return { ...(createInitialState ? createInitialState() : {}), ...rest };
  };

  // tslint:disable-next-line:no-any
  const serialize = ({ editorState, ...rest }: SlateState) => ({
    // tslint:disable-next-line:no-any
    serialized: editorState,
    ...rest,
  });

  return {
    serialize,
    unserialize,
    htmlToSlate,
  };
};
