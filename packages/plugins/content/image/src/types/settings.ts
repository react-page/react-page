import { ImageUploadType } from '@react-page/ui/lib/ImageUpload';
import { ImageRendererProps } from './renderer';
import { ImageControlsProps } from './controls';
import { Translations } from './translations';

export type ImageSettings = {
  imageUpload?: ImageUploadType;
  Renderer: React.ComponentType<ImageRendererProps>;
  Controls: React.ComponentType<ImageControlsProps>;
  translations?: Translations;
};