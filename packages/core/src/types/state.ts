import { Editables } from './editable';
import { Display } from './display';
import { Focus } from '../reducer/focus';

export type RootState = {
  reactPage: {
    editables: Editables;
    display: Display;
    focus: Focus;

    settings: {
      lang?: string;
    };
  };
};
