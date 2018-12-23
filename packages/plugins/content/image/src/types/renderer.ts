import { ImageProps } from './component';
import { ImageLoaded } from 'ory-editor-ui/lib/ImageUpload';

export interface ImageRendererExtraProps {
  imagePreview?: ImageLoaded;
}

export type ImageRendererProps = ImageProps & ImageRendererExtraProps;