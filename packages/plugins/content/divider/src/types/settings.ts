import { DividerProps } from './component';
import { DividerRendererProps } from './renderer';
import { Translations } from './translations';

export interface DividerSettings {
  Renderer: React.ComponentType<DividerRendererProps>;
  Controls: React.ComponentType<DividerProps>;
  translations?: Translations;
}