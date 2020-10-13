import { CellPluginComponentProps } from '@react-page/core';
import { Html5VideoSettings } from './settings';
import { Html5VideoState } from './state';

export type Html5VideoProps = CellPluginComponentProps<Html5VideoState> &
  Html5VideoSettings;
