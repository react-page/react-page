import { BackgroundRendererProps } from './renderer';
import { BackgroundControlsProps } from './controls';
import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { RGBColor } from '@react-page/ui/lib/ColorPicker';
import { ImageUploadType } from '@react-page/ui/lib/ImageUpload';
import { ModeEnum } from './modeEnum';
import { Translations } from './translations';

export type BackgroundSettings = {
  Renderer: React.ComponentType<BackgroundRendererProps>;
  Controls: React.ComponentType<BackgroundControlsProps>;
  defaultPlugin: ContentPluginConfig;
  enabledModes?: ModeEnum;
  // tslint:disable-next-line:no-any
  getInitialChildren?: () => any;
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