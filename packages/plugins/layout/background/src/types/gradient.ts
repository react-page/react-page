import { RGBColor } from 'ory-editor-ui/lib/ColorPicker';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};