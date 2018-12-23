import { SpacerControlsProps } from './controls';
import { SpacerHtmlRendererProps } from './renderer';

export interface SpacerSettings {
  Renderer: React.ComponentType<SpacerHtmlRendererProps>;
  Controls: React.ComponentType<SpacerControlsProps>;
}