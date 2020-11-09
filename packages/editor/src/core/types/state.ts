import type { Editables } from './editable';
import type { Display } from './display';
import type { Focus } from '../reducer/focus';
import type { Hover } from '../reducer/hover';

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
