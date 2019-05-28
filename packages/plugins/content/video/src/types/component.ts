import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { VideoState } from './state';
import { VideoSettings } from './settings';

export type VideoProps = ContentPluginProps<VideoState> & VideoSettings;
