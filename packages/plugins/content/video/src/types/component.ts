import { PluginProps } from '@react-page/core';
import { VideoSettings } from './settings';
import { VideoState } from './state';

export type VideoProps = PluginProps<VideoState> & VideoSettings;
