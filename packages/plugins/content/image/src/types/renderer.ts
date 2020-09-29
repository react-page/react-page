import { ImageProps } from './component';
import { ImageLoaded } from '@react-page/ui';

export interface ImageRendererExtraProps {
  imagePreview?: ImageLoaded;
}

export type ImageRendererProps = ImageProps & ImageRendererExtraProps;
