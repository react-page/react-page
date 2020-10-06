import { PluginProps } from '@react-page/core';
import { SpacerSettings } from './settings';
import { SpacerState } from './state';

export type SpacerProps = PluginProps<SpacerState> & SpacerSettings;
