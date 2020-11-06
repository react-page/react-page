import { Editables } from './editable';
import { Display } from './display';
import { Focus } from '../reducer/focus';
import { Hover } from '../reducer/hover';

export type RootState = {
  reactPage: {
    editables: Editables;
    display: Display;
    focus: Focus;
    hover: Hover;
    settings: {
      lang?: string;
    };
  };
};
