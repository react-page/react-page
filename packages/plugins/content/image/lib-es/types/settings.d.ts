/// <reference types="react" />
import type { CellPluginRenderer, ImageUploadType } from '@react-page/editor';
import type { ImageControlType } from './controls';
import type { ImageState } from './state';
import type { Translations } from './translations';
export type ImageSettings = {
    imageUpload?: ImageUploadType;
    Renderer: CellPluginRenderer<ImageState>;
    Controls: ImageControlType;
    translations?: Translations;
    icon?: React.ReactNode;
};
//# sourceMappingURL=settings.d.ts.map