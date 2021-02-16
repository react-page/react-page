import { CellPluginComponentProps } from '@react-page/editor';
import { VideoSettings } from './settings';
import { VideoState } from './state';

export type VideoProps = CellPluginComponentProps<VideoState> & VideoSettings;
