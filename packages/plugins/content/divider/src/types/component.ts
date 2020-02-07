import { ContentPluginProps } from '@react-page/core';
import { DividerSettings } from './settings';
import { DividerState } from './state';

export type DividerProps = ContentPluginProps<DividerState> & DividerSettings;
