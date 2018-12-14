import { ImageUploadType } from 'ory-editor-ui/lib/ImageUpload';
export interface ImageState {
  src: string;
  caption?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export type ImagePluginSettings = {
  imageUpload: ImageUploadType;
};
