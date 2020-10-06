import { PluginProps } from '@react-page/core';
import { ImageSettings } from './settings';
import { ImageState } from './state';

export type ImageProps = PluginProps<ImageState> & ImageSettings;
