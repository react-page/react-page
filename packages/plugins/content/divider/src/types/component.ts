import { PluginProps } from '@react-page/core';
import { DividerSettings } from './settings';
import { DividerState } from './state';

export type DividerProps = PluginProps<DividerState> & DividerSettings;
