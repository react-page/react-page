import { ModeEnum } from './modeEnum';
import { RGBColor } from '@react-page/ui/lib/ColorPicker';
import { ImageLoaded } from '@react-page/ui/lib/ImageUpload';

export interface BackgroundApi {
  handleChangeDarken: () => void;
  handleChangeDarkenPreview: (darken: number) => void;
  handleChangeLighten: () => void;
  handleChangeLightenPreview: (lighten: number) => void;
  handleChangeHasPadding: () => void;
  handleChangeModeSwitch: (mode: ModeEnum, modeFlag: ModeEnum) => () => void;
  handleChangeBackgroundColorPreview: (color: RGBColor) => void;
  handleChangeGradientDegPreview: (
    gradientDegPreview: number,
    gradientDegPreviewIndex?: number
  ) => void;
  handleChangeGradientOpacityPreview: (
    gradientOpacityPreview: number,
    gradientOpacityPreviewIndex?: number
  ) => void;
  handleChangeGradientColorPreview: (
    gradientColorPreview: RGBColor,
    gradientColorPreviewIndex?: number,
    gradientColorPreviewColorIndex?: number
  ) => void;
  handleImageLoaded: (imagePreview: ImageLoaded) => void;
  handleImageUploaded: () => void;
}
