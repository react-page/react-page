import { CellPluginComponentProps } from '@react-page/editor';
import { SpacerState } from './state';
import { Translations } from './translations';

export interface SpacerSettings {
  Renderer: React.ComponentType<CellPluginComponentProps<SpacerState>>;

  translations?: Translations;
}
