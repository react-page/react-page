import { Html5VideoControlsProps } from './controls';
import { Html5VideoRendererProps } from './renderer';
import { Translations } from './translations';

export interface Html5VideoSettings {
  Renderer: React.ComponentType<Html5VideoRendererProps>;
  Controls: React.ComponentType<Html5VideoControlsProps>;
  translations?: Translations;
}