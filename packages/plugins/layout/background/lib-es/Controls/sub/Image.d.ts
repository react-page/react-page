import React from 'react';
import type { ImageLoaded, ImageUploaded } from '@react-page/editor';
import type { BackgroundProps } from '../../types/component';
export interface ImageComponentProps {
    ensureModeOn: () => void;
    onImageLoaded: (image: ImageLoaded) => void;
    onImageUploaded: () => void;
}
declare class ImageComponent extends React.Component<BackgroundProps & ImageComponentProps> {
    handleChangeBackground: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeIsParallax: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageLoaded: (image: ImageLoaded) => void;
    handleImageUploaded: (resp: ImageUploaded) => void;
    render(): JSX.Element;
}
export default ImageComponent;
//# sourceMappingURL=Image.d.ts.map