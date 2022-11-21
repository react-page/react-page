import React from 'react';
import type { BackgroundProps } from '../types/component';
import type { ImageLoaded, RGBColor } from '@react-page/editor';
import type { ModeEnum } from '../types/ModeEnum';
export type BackgroundState = {
    backgroundColorPreview?: RGBColor;
    gradientDegPreview?: number;
    gradientDegPreviewIndex?: number;
    gradientOpacityPreview?: number;
    gradientOpacityPreviewIndex?: number;
    gradientColorPreview?: RGBColor;
    gradientColorPreviewIndex?: number;
    gradientColorPreviewColorIndex?: number;
    darkenPreview?: number;
    lightenPreview?: number;
    imagePreview?: ImageLoaded;
};
declare class BackgroundDefaultControls extends React.Component<BackgroundProps, BackgroundState> {
    constructor(props: BackgroundProps);
    handleChangeDarken: () => void;
    handleChangeDarkenPreview: (value: number) => void;
    handleChangeLighten: () => void;
    handleChangeLightenPreview: (value: number) => void;
    handleChangeHasPadding: () => void;
    handleChangeBackgroundColorPreview: (e?: RGBColor) => void;
    handleChangeGradientDegPreview: (gradientDegPreview: number | undefined, gradientDegPreviewIndex?: number) => void;
    handleChangeGradientOpacityPreview: (gradientOpacityPreview: number | undefined, gradientOpacityPreviewIndex?: number) => void;
    handleChangeGradientColorPreview: (gradientColorPreview: RGBColor | undefined, gradientColorPreviewIndex?: number, gradientColorPreviewColorIndex?: number) => void;
    handleImageLoaded: (imagePreview: ImageLoaded) => void;
    handleImageUploaded: () => void;
    handleChangeModeSwitch: (mode: ModeEnum | undefined, modeFlag: ModeEnum | undefined) => () => void;
    render(): JSX.Element;
}
export default BackgroundDefaultControls;
//# sourceMappingURL=Controls.d.ts.map