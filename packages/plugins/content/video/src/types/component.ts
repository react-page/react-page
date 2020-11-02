import { CellPluginComponentProps } from '@react-page/core';
import { VideoSettings } from './settings';
import { VideoState } from './state';

export type VideoProps = CellPluginComponentProps<VideoState> & VideoSettings;
