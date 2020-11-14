import { RootState } from '../types/state';
import * as DisplaySelectors from './display';
import * as EditableSelectors from './editable';
import { editable, editables } from './editable';
import * as SettingSelectors from './setting';

export const Selectors = {
  Display: DisplaySelectors,
  Setting: SettingSelectors,
  Editable: EditableSelectors,
};

export { editable, editables, RootState };
