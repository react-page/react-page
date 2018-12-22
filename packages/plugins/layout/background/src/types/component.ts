import { LayoutPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { BackgroundState } from './state';
import { BackgroundSettings } from './settings';

export type BackgroundProps = LayoutPluginProps<BackgroundState> & BackgroundSettings;
