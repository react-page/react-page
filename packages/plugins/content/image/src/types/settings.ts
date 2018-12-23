import { ImageUploadType } from 'ory-editor-ui/lib/ImageUpload';
import { ImageRendererProps } from './renderer';
import { ImageControlsProps } from './controls';

export type ImageSettings = {
  imageUpload?: ImageUploadType;
  Renderer: React.ComponentType<ImageRendererProps>;
  Controls: React.ComponentType<ImageControlsProps>;
};