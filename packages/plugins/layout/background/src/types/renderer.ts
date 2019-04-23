import { BackgroundProps } from './component';
import { RGBColor } from 'ory-editor-ui/lib/ColorPicker';
import { ImageLoaded } from 'ory-editor-ui/lib/ImageUpload';

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
  forecolorPreview?: string;
  backgroundSize?: string;
  backgroundPositionH?: string;
  backgroundPositionV?: string;
}

export type BackgroundRendererProps = BackgroundProps & BackgroundRendererExtraProps;