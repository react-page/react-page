import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

export type Data = Record<string, unknown> | unknown;
type CustomText = {
  text: string;
  data?: Data;
  type?: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor & {
        type: string;
        data?: Data;
      };
    Element: {
      type: string;
      data?: Data;
      children: Descendant[];
    };
    Text: CustomText;
  }
}
