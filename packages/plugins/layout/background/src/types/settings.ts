import { BackgroundRendererProps } from './renderer';
import { BackgroundControlsProps } from './controls';
import { InitialChildrenDef, ContentPluginConfig } from '@react-page/core';
import { RGBColor } from '@react-page/ui/lib/ColorPicker/types';
import { ImageUploadType } from '@react-page/ui/lib/ImageUpload/types';
import { ModeEnum } from './ModeEnum';
import { Translations } from './translations';

export type BackgroundSettings = {
  Renderer: React.ComponentType<BackgroundRendererProps>;
  Controls: React.ComponentType<BackgroundControlsProps>;
  defaultPlugin: ContentPluginConfig;
  enabledModes?: ModeEnum;
  // tslint:disable-next-line:no-any
  getInitialChildren?: () => InitialChildrenDef;
  defaultBackgroundColor?: RGBColor;
  defaultGradientColor?: RGBColor;
  defaultGradientSecondaryColor?: RGBColor;
  defaultMode?: ModeEnum;
  defaultModeFlag?: ModeEnum;
  defaultDarken?: number;
  defaultLighten?: number;
  defaultHasPadding?: boolean;
  defaultIsParallax?: boolean;
  imageUpload: ImageUploadType;
  translations?: Translations;
};
