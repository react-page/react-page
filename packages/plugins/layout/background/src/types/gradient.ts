import { RGBColor } from '@react-page/ui';

export type Gradient = {
  opacity: number;
  deg: number;
  colors?: { color: RGBColor }[];
};
