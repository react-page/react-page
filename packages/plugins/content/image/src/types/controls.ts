import { CellPluginComponentProps, ImageUploadType } from '@react-page/editor';

import { ImageState } from './state';
import { Translations } from './translations';

export type ImageControlType = React.ComponentType<
  CellPluginComponentProps<ImageState> & {
    imageUpload?: ImageUploadType;
    translations: Translations;
  }
>;
