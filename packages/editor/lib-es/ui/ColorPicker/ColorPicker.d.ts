import React from 'react';
import type { ColorChangeHandler } from 'react-color';
import type { ColorPickerProps, ColorPickerState } from './types';
declare class ColorPicker extends React.Component<ColorPickerProps> {
    static defaultProps: Partial<ColorPickerProps>;
    anchorEl: HTMLElement | null;
    state: ColorPickerState;
    handleClickShowColorPicker: (e: React.MouseEvent<HTMLElement>) => void;
    onChange: ColorChangeHandler;
    handleChangeComplete: ColorChangeHandler;
    render(): JSX.Element;
}
export default ColorPicker;
//# sourceMappingURL=ColorPicker.d.ts.map