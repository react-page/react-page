import Html from 'slate-html-serializer';

import { SlateState } from '../types/state';
import { Value, ValueJSON } from 'slate';

import { EditorState } from '@react-page/core/lib/types/editor';
import { PluginProps } from '@react-page/core/lib/service/plugin/classes';
import createInitialState from './createInitialState';

const parseHtml = require('jsdom').fragment; // we exclude that on browsers through package.json's browser field

type AdditionalSlateFunctions = {
  slateToHtml: (editorState: EditorState) => string;
  htmlToSlate: (html: string) => EditorState;
};
export type SerializationFunctions = Pick<
  PluginProps<SlateState>,
  'serialize' | 'unserialize' | 'createInitialState'
> &
  AdditionalSlateFunctions;
export default ({ plugins }): SerializationFunctions => {
  // tslint:disable-next-line:no-any

  const html = new Html({
    rules: plugins,
    // tslint:disable-next-line:no-any
    parseHtml,
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

  return {
    serialize,
    unserialize,
    slateToHtml,
    htmlToSlate,
  };
};
