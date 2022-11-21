/// <reference types="react" />
import type { CellPluginComponentProps, ImageUploadType } from '@react-page/editor';
import type { ImageState } from './state';
import type { Translations } from './translations';
export type ImageControlType = React.ComponentType<CellPluginComponentProps<ImageState> & {
    imageUpload?: ImageUploadType;
    translations?: Translations;
}>;
//# sourceMappingURL=controls.d.ts.map