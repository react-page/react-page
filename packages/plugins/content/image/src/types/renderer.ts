import { ImageProps } from './component';
import { ImageLoaded } from '@react-page/ui/lib/ImageUpload/types';

export interface ImageRendererExtraProps {
  imagePreview?: ImageLoaded;
}

export type ImageRendererProps = ImageProps & ImageRendererExtraProps;
