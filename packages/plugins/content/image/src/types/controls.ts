import { ImageProps } from './component';
import { ImageApi } from './api';
import { ImageRendererExtraProps } from './renderer';

export type ImageControlsProps = ImageProps &
  ImageApi &
  ImageRendererExtraProps;
