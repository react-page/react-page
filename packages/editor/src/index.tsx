export * from './core/types';
export * from './core/components/hooks';

import type { RGBColor } from 'react-color';
import lazyLoad from './core/helper/lazyLoad';
import { Migration } from './core/migrations/Migration';

import Editor, { EditorProps } from './editor/Editor';
import makeUniformsSchema from './ui/AutoformControls/makeUniformsSchema';
import ColorPicker from './ui/ColorPicker';
import { colorToString } from './ui/ColorPicker/colorToString';

import ImageUpload from './ui/ImageUpload';
import type {
  ImageLoaded,
  ImageUploaded,
  ImageUploadType,
} from './ui/ImageUpload/types';

export { Migration };
export { lazyLoad };
export { EditorProps };

export { makeUniformsSchema };

export {
  ImageLoaded,
  RGBColor,
  ColorPicker,
  ImageUploadType,
  ImageUploaded,
  ImageUpload,
  colorToString,
};

export default Editor;

export const VERSION = '###VERSION###';
