import { RGBColor } from '@react-page/editor';
import { Gradient } from './gradient';
import { ModeEnum } from './ModeEnum';

export interface BackgroundState {
  background: string;
  backgroundColor: RGBColor;
  isParallax: boolean;
  modeFlag: ModeEnum;
  padding: number;
  lighten: number;
  darken: number;
  hasPadding: boolean;
  gradients: Gradient[];
}
