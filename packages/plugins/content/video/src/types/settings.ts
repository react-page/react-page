import { VideoControlsProps } from './controls';
import { VideoHtmlRendererProps } from './renderer';

export interface VideoSettings {
  Renderer: React.ComponentType<VideoHtmlRendererProps>;
  Controls: React.ComponentType<VideoControlsProps>;
  placeholder?: string;
  label?: string;
}