import { Editables } from './editable';
import { Display } from './display';

export type RootState = {
  reactPage: {
    editables: Editables;
    display: Display;
    focus: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings: { [key: string]: any };
  };
};
