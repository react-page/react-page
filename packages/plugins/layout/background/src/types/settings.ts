import { PluginBase } from '@react-page/core';

import { ImageUploadType, RGBColor } from '@react-page/ui';
import { BackgroundControlsProps } from './controls';
import { ModeEnum } from './ModeEnum';
import { BackgroundRendererProps } from './renderer';
import { Translations } from './translations';

export type BackgroundSettings = {
  Renderer: React.ComponentType<BackgroundRendererProps>;
  Controls: React.ComponentType<BackgroundControlsProps>;
  defaultPlugin: PluginBase;
  enabledModes?: ModeEnum;
  getInitialChildren?: PluginBase['createInitialChildren'];
  defaultBackgroundColor?: RGBColor;
  defaultGradientColor?: RGBColor;
  defaultGradientSecondaryColor?: RGBColor;
  defaultMode?: ModeEnum;
  defaultModeFlag?: ModeEnum;
  defaultDarken?: number;
  defaultLighten?: number;
  defaultHasPadding?: boolean;
  defaultIsParallax?: boolean;
  imageUpload?: ImageUploadType;
  translations?: Translations;
};
