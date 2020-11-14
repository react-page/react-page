import { RGBColor } from '@react-page/editor';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};
