import React from 'react';

import { SlateState } from '../types/state';
import { Value, ValueJSON } from 'slate';

import { EditorState } from '@react-page/core/lib/types/editor';
import { PluginProps } from '@react-page/core/lib/service/plugin/classes';
import createInitialState from './createInitialState';

type AdditionalSlateFunctions = {
  slateToHtml: (editorState: EditorState) => Promise<string>;
  htmlToSlate: (html: string) => Promise<EditorState>;
};
export type SerializationFunctions = Pick<
  PluginProps<SlateState>,
  'serialize' | 'unserialize' | 'createInitialState'
> &
  AdditionalSlateFunctions;
export default ({ plugins }): SerializationFunctions => {
  const lineBreakSerializer = {
    // tslint:disable-next-line:no-any
    deserialize(el: any) {
      if (el.tagName.toLowerCase() === 'br') {
        return { object: 'text', text: '\n' };
      }
      if (el.nodeName === '#text') {
        if (el.value && el.value.match(/<!--.*?-->/)) {
          return;
        }

        return {
          object: 'text',
          leaves: [
            {
              object: 'leaf',
              text: el.value,
            },
          ],
        };
      }
    },
    // tslint:disable-next-line:no-any
    serialize(object: any, children: string) {
      if (object.type === 'text' || children === '\n') {
        return <br />;
      }
    },
  };
  let htmlSerializer;
  const getSlateHtmlSerializer = async () => {
    if (!htmlSerializer) {
      const {
        default: SlateHtmlSerializer,
      } = await import('slate-html-serializer');
      console.log('loading parse5');
      const { parseFragment } = await import('parse5');
      console.log('loading parse5 done');
      htmlSerializer = new SlateHtmlSerializer({
        rules: [...plugins, lineBreakSerializer],
        parseHtml: parseFragment,
      });
    }
    return htmlSerializer;
  };

  const htmlToSlate = async (htmlString: string) =>
    (await getSlateHtmlSerializer()).deserialize(htmlString);
  const slateToHtml = async (editorState: EditorState) =>
    (await getSlateHtmlSerializer()).serialize(editorState);

  const unserialize = async ({
    importFromHtml,
    serialized,
    editorState,
  }: // tslint:disable-next-line:no-any
  SlateState): Promise<SlateState> => {
    if (serialized) {
      // tslint:disable-next-line:no-any
      return { editorState: (Value.fromJSON as any)(serialized) };
    } else if (importFromHtml) {
      return { editorState: await htmlToSlate(importFromHtml) };
    } else if (editorState) {
      return { editorState };
    }

    return createInitialState();
  };

  // tslint:disable-next-line:no-any
  const serialize = ({
    editorState,
  }: SlateState): { serialized: ValueJSON } => ({
    // tslint:disable-next-line:no-any
    serialized: (editorState.toJSON as any)(editorState),
  });
  return {
    serialize,
    unserialize,
    slateToHtml,
    htmlToSlate,
  };
};
