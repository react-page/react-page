import { ContentPluginProps } from '@react-page/core';
import { VideoSettings } from './settings';
import { VideoState } from './state';

export type VideoProps = ContentPluginProps<VideoState> & VideoSettings;
