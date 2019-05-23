import { SpacerControlsProps } from './controls';
import { SpacerHtmlRendererProps } from './renderer';
import { Translations } from './translations';

export interface SpacerSettings {
  Renderer: React.ComponentType<SpacerHtmlRendererProps>;
  Controls: React.ComponentType<SpacerControlsProps>;
  translations?: Translations;
}