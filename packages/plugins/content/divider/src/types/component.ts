import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { DividerState } from './state';
import { DividerSettings } from './settings';

export type DividerProps = ContentPluginProps<DividerState> & DividerSettings;
