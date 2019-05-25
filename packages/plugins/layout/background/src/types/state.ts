import { RGBColor } from '@react-page/ui/lib/ColorPicker';
import { Gradient } from './gradient';
import { ModeEnum } from './modeEnum';

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