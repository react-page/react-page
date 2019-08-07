import Html from 'slate-html-serializer';
import React from 'react';
import parse5 from 'parse5';
import { SlateState } from '../types/state';
import { Value, ValueJSON, BlockJSON } from 'slate';
import { P } from '../plugins/paragraph';
import { EditorState } from '@react-page/core/lib/types/editor';
import { PluginProps } from '@react-page/core/lib/service/plugin/classes';

type AdditionalSlateFunctions = {
  slateToHtml: (editorState: EditorState) => string
  htmlToSlate: (html: string) => EditorState
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

  const html = new Html({
    rules: [...plugins, lineBreakSerializer],
    parseHtml: parse5.parseFragment,
  });

  const htmlToSlate = (htmlString: string) => html.deserialize(htmlString);
  const slateToHtml = (editorState: EditorState) => html.serialize(editorState);

  const unserialize = ({
    importFromHtml,
    serialized,
    editorState,
  }: // tslint:disable-next-line:no-any
  SlateState): SlateState => {
    if (serialized) {
      // tslint:disable-next-line:no-any
      return { editorState: (Value.fromJSON as any)(serialized) };
    } else if (importFromHtml) {
      return { editorState: htmlToSlate(importFromHtml) };
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

  const createInitialState = () => ({
    editorState: Value.fromJSON({
      document: {
        nodes: [
          {
            object: 'block',
            type: P,
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          } as BlockJSON,
        ],
      },
    }),
  });

  return {
    serialize,
    unserialize,
    createInitialState,
    slateToHtml,
    htmlToSlate,
  };
};
