import { CellPluginComponentProps } from '@react-page/core';
import { DividerSettings } from './settings';
import { DividerState } from './state';

export type DividerProps = CellPluginComponentProps<DividerState> &
  DividerSettings;
