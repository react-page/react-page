import type { CellPluginComponentProps } from '@react-page/editor';
import type { VideoSettings } from './settings';
import type { VideoState } from './state';

export type VideoProps = CellPluginComponentProps<VideoState> & VideoSettings;
