import { VideoControlsProps } from './controls';
import { VideoHtmlRendererProps } from './renderer';
import { Translations } from './translations';

export interface VideoSettings {
  Renderer: React.ComponentType<VideoHtmlRendererProps>;

  placeholder?: string;
  label?: string;
  translations?: Translations;
  IconComponent?: React.ReactNode;
}
