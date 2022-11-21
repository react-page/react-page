import { Component } from 'react';
import type { RGBColor } from '@react-page/editor';
import type { BackgroundProps } from '../../types/component';
export interface ColorComponentProps {
    onChangeBackgroundColorPreview: (color?: RGBColor) => void;
    backgroundColorPreview?: RGBColor;
    ensureModeOn: () => void;
}
declare class ColorComponent extends Component<BackgroundProps & ColorComponentProps> {
    handleChangePickerBackgroundColor: (e?: RGBColor) => void;
    handleChangePickerBackgroundColorComplete: (e?: RGBColor) => void;
    render(): JSX.Element;
}
export default ColorComponent;
//# sourceMappingURL=Color.d.ts.map