import { CellPluginComponentProps } from '@react-page/core';
import { BackgroundSettings } from './settings';
import { BackgroundState } from './state';

export type BackgroundProps = CellPluginComponentProps<BackgroundState> &
  BackgroundSettings;
