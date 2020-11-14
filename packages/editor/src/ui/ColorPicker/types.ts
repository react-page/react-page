import { RGBColor } from 'react-color';

export interface ColorPickerProps {
  onChange: (color: RGBColor) => void;
  onChangeComplete: (color: RGBColor) => void;
  color: RGBColor;
  buttonContent?: JSX.Element | string;
  icon?: JSX.Element | string;
  onDialogOpen?: () => void;
  style?: React.CSSProperties;
}

export type ColorPickerState = {
  isColorPickerVisible: boolean;
};

export { RGBColor };
