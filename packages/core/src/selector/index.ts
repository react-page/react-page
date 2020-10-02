import { Store } from 'redux';
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
export const selectors = (store: Store<RootState>) => ({
  editable: (id: string) => editable(store.getState(), { id }),
  editables: (id: string) => editables(store.getState()),
});

export { editable, editables, RootState };
