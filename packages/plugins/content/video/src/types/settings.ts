import { VideoControlsProps } from './controls';
import type { VideoHtmlRendererProps } from './renderer';
import type { Translations } from './translations';

export interface VideoSettings {
  Renderer: React.ComponentType<VideoHtmlRendererProps>;

  placeholder?: string;
  label?: string;
  translations?: Translations;
  icon?: React.ReactNode;
}
