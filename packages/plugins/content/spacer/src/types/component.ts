import { ContentPluginProps } from '@react-page/core';
import { SpacerSettings } from './settings';
import { SpacerState } from './state';

export type SpacerProps = ContentPluginProps<SpacerState> & SpacerSettings;
