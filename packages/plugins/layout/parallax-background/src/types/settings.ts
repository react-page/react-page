import { ParallaxBackgroundRendererProps } from './renderer';
import { ParallaxBackgroundControlsProps } from './controls';
import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';

export type ParallaxBackgroundSettings = {
  Renderer: React.ComponentType<ParallaxBackgroundRendererProps>;
  Controls: React.ComponentType<ParallaxBackgroundControlsProps>;
  defaultPlugin: ContentPluginConfig;
  // tslint:disable-next-line:no-any
  getInitialChildren?: () => any;
};