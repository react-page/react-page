import Html from 'slate-html-serializer';

import { SlateState } from '../types/state';
import { Value, ValueJSON } from 'slate';

import { EditorState } from '@react-page/core/lib/types/editor';
import { PluginProps } from '@react-page/core/lib/service/plugin/classes';
import createInitialState from './createInitialState';

import parseHtml from '../parseHtml/parseHtml';
import SlatePlugin from '../types/SlatePlugin';

type AdditionalSlateFunctions = {
  slateToHtml: (editorState: EditorState) => string;
  htmlToSlate: (html: string) => EditorState;
};
export type SerializationFunctions = Pick<
  PluginProps<SlateState>,
  'serialize' | 'unserialize' | 'createInitialState'
> &
  AdditionalSlateFunctions;
export default ({ plugins }: { plugins: SlatePlugin[] }) => {
  // tslint:disable-next-line:no-any

  const rules = plugins
    .filter(p => p.serialize && p.deserialize)
    .map(p => ({
      serialize: p.serialize,
      deserialize: p.deserialize,
    }));

  const html = new Html({
    rules: rules,
    // tslint:disable-next-line:no-any
    parseHtml,
  });

  const htmlToSlate = (htmlString: string) => html.deserialize(htmlString);
  const slateToHtml = (editorState: EditorState) => html.serialize(editorState);

  const unserialize = ({
    importFromHtml,
    serialized,
    editorState,
    ...rest
  }: // tslint:disable-next-line:no-any
  SlateState): SlateState => {
    if (serialized) {
      // tslint:disable-next-line:no-any
      return { editorState: (Value.fromJSON as any)(serialized), ...rest };
    } else if (importFromHtml) {
      return { editorState: htmlToSlate(importFromHtml), ...rest };
    } else if (editorState) {
      return { editorState, ...rest };
    }

    return { ...createInitialState(), ...rest };
  };

  // tslint:disable-next-line:no-any
  const serialize = ({
    editorState,
    ...rest
  }: SlateState): { serialized: ValueJSON } => ({
    // tslint:disable-next-line:no-any
    serialized: (editorState.toJSON as any)(editorState),
    ...rest,
  });

  return {
    serialize,
    unserialize,
    slateToHtml,
    htmlToSlate,
  };
};
