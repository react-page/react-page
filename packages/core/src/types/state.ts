import { Editables } from './editable';
import { Display } from './display';

export type RootState = {
  reactPage: {
    editables: Editables;
    display: Display;
    focus: string;
    // tslint:disable-next-line:no-any
    settings: { [key: string]: any };
  };
};
