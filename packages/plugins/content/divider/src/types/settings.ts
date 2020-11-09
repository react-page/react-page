import { CellPluginComponentProps } from '@react-page/editor';
import { Translations } from './translations';

export interface DividerSettings {
  Renderer: React.ComponentType<CellPluginComponentProps<void>>;
  translations?: Translations;
}
