import { Editables } from './editable';
import { Display } from './display';

export type RootState = {
  reactPage: {
    editables: Editables;
    display: Display;
    focus: string;

    settings: {
      lang?: string;
    };
  };
};
