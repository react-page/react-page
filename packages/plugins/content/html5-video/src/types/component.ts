import { PluginProps } from '@react-page/core';
import { Html5VideoSettings } from './settings';
import { Html5VideoState } from './state';

export type Html5VideoProps = PluginProps<Html5VideoState> & Html5VideoSettings;
