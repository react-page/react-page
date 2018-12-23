import { ParallaxBackgroundRendererProps } from './renderer';
import { ParallaxBackgroundControlsProps } from './controls';
import { ContentPluginConfig } from 'ory-editor-core/lib/service/plugin/classes';

export type ParallaxBackgroundSettings = {
  Renderer: React.ComponentType<ParallaxBackgroundRendererProps>;
  Controls: React.ComponentType<ParallaxBackgroundControlsProps>;
  defaultPlugin: ContentPluginConfig;
};