import { CellPluginComponentProps } from '@react-page/editor';
import { BackgroundSettings } from './settings';
import { BackgroundState } from './state';

export type BackgroundProps = CellPluginComponentProps<BackgroundState> &
  BackgroundSettings;
