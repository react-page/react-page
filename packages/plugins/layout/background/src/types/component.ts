import type { CellPluginComponentProps } from '@react-page/editor';
import type { BackgroundSettings } from './settings';
import type { BackgroundState } from './state';

export type BackgroundProps = CellPluginComponentProps<BackgroundState> &
  BackgroundSettings;
