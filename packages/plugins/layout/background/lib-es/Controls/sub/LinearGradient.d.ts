import type { RGBColor } from '@react-page/editor';
import React from 'react';
import type { BackgroundProps } from '../../types/component';
export interface LinearGradientComponentProps {
    ensureModeOn: () => void;
    onChangeGradientDegPreview: (value: number | undefined, index: number | undefined) => void;
    onChangeGradientOpacityPreview: (value: number | undefined, index: number | undefined) => void;
    onChangeGradientColorPreview: (color: RGBColor | undefined, index: number | undefined, cIndex: number | undefined) => void;
    gradientDegPreview?: number;
    gradientDegPreviewIndex?: number;
    gradientOpacityPreview?: number;
    gradientOpacityPreviewIndex?: number;
    gradientColorPreview?: RGBColor;
    gradientColorPreviewIndex?: number;
    gradientColorPreviewColorIndex?: number;
}
declare class LinearGradientComponent extends React.Component<LinearGradientComponentProps & BackgroundProps> {
    addGradient: () => void;
    handleChangeDeg: (index: number, value: number) => () => void;
    handleChangeDegPreview: (index: number) => (e: any, value: number) => void;
    handleChangeOpacity: (index: number, value: number) => () => void;
    handleChangeOpacityPreview: (index: number) => (e: unknown, value: number) => void;
    handleChangeGradientColor: (index: number, cpIndex: number) => (e: RGBColor) => void;
    handleChangeGradientColorPreview: (index: number, cpIndex: number) => (e: RGBColor) => void;
    addColor: (index: number) => () => void;
    removeColor: (index: number, cpIndex: number) => () => void;
    removeGradient: (index: number) => () => void;
    render(): JSX.Element;
}
export default LinearGradientComponent;
//# sourceMappingURL=LinearGradient.d.ts.map