import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { Data, CustomText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor &
      ReactEditor & {
        type: string | null;
        data?: Data | null;
      };
    Element: {
      type?: string | null;
      data?: Data | null;
      children: Descendant[];
    };
    Text: CustomText;
  }
}

export {};
