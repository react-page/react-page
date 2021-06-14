import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { Data, CustomText } from './types';

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

export {};
