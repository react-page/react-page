import { ParallaxBackgroundRendererProps } from './renderer';
import { ParallaxBackgroundControlsProps } from './controls';
import { InitialChildrenDef, ContentPluginConfig } from '@react-page/core';

export type ParallaxBackgroundSettings = {
  Renderer: React.ComponentType<ParallaxBackgroundRendererProps>;
  Controls: React.ComponentType<ParallaxBackgroundControlsProps>;
  defaultPlugin: ContentPluginConfig;
  // tslint:disable-next-line:no-any
  getInitialChildren?: () => InitialChildrenDef;
};
