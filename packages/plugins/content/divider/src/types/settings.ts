import { DividerProps } from './component';
import { DividerRendererProps } from './renderer';

export interface DividerSettings {
  Renderer: React.ComponentType<DividerRendererProps>;
  Controls: React.ComponentType<DividerProps>;
}