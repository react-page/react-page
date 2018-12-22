import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { SlateState } from './state';
import { SlateSettings } from './settings';

export type SlateProps = ContentPluginProps<SlateState> & SlateSettings;
