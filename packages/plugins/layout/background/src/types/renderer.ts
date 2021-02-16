import { BackgroundProps } from './component';
import { ImageLoaded, RGBColor } from '@react-page/editor';

export interface BackgroundRendererExtraProps {
  backgroundColorPreview?: RGBColor;
  gradientDegPreview?: number;
  gradientDegPreviewIndex?: number;
  gradientOpacityPreview?: number;
  gradientOpacityPreviewIndex?: number;
  gradientColorPreview?: RGBColor;
  gradientColorPreviewIndex?: number;
  gradientColorPreviewColorIndex?: number;
  darkenPreview?: number;
  lightenPreview?: number;
  imagePreview?: ImageLoaded;
}

export type BackgroundRendererProps = BackgroundProps &
  BackgroundRendererExtraProps;
