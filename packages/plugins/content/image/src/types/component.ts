import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { ImageState } from './state';
import { ImageSettings } from './settings';

export type ImageProps = ContentPluginProps<ImageState> & ImageSettings;
