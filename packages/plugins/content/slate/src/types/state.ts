import { Value, ValueJSON } from 'slate';
export interface SlateState {
  importFromHtml?: string;
  serialized?: ValueJSON;
  editorState?: Value;
}
