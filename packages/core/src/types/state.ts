import { Editables } from './editable';
import { Display } from './display';

export type RootState = {
  ory: {
    editables: Editables;
    display: Display;
    focus: string;
    // tslint:disable-next-line:no-any
    settings: { [key: string]: any };
  };
};
