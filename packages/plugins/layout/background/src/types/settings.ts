import { CellPlugin, ImageUploadType, RGBColor } from '@react-page/editor';

import { BackgroundControlsProps } from './controls';
import { ModeEnum } from './ModeEnum';
import { BackgroundRendererProps } from './renderer';
import { Translations } from './translations';

export type BackgroundSettings = {
  Renderer: React.ComponentType<BackgroundRendererProps>;
  Controls: React.ComponentType<BackgroundControlsProps>;
  enabledModes?: ModeEnum;
  getInitialChildren?: CellPlugin['createInitialChildren'];
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
