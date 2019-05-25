import { RGBColor } from '@react-page/ui/lib/ColorPicker';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};