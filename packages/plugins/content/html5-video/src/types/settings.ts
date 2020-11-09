import { CellPluginComponentProps } from '@react-page/editor';

import { Html5VideoState } from './state';
import { Translations } from './translations';

export interface Html5VideoSettings {
  Renderer: React.ComponentType<CellPluginComponentProps<Html5VideoState>>;

  translations?: Translations;
  IconComponent?: React.ReactNode;
  isInlineable?: boolean;
}
