import { CellPluginComponentProps } from '@react-page/core';
import { SpacerSettings } from './settings';
import { SpacerState } from './state';

export type SpacerProps = CellPluginComponentProps<SpacerState> &
  SpacerSettings;
