import { CellPluginRenderer, ImageUploadType } from '@react-page/editor';
import { ImageControlType } from './controls';
import { ImageState } from './state';

import { Translations } from './translations';

export type ImageSettings = {
  imageUpload?: ImageUploadType;
  Renderer: CellPluginRenderer<ImageState>;
  Controls: ImageControlType;
  translations?: Translations;
  icon?: React.ReactNode;
};
