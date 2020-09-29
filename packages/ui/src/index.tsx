// something is wrong with lerna, typescript and this import: import { lazyLoad } from '@react-page/core';
import loadable from '@loadable/component';
import { BottomToolbarProps } from './BottomToolbar/types';
import { colorToString } from './ColorPicker/colorToString';
import darkTheme from './ThemeProvider/DarkTheme';
import {
  ImageUploadType,
  ImageUploaded,
  ImageLoaded,
} from './ImageUpload/types';
import { RGBColor } from './ColorPicker/types';
const Trash = loadable(() => import('./Trash/index'));
const Toolbar = loadable(() => import('./Toolbar/index'));
const DisplayModeToggle = loadable(() => import('./DisplayModeToggle/index'));
const BottomToolbar = loadable(() => import('./BottomToolbar/index'));
const EditorUI = loadable(() => import('./EditorUI/index'));

const ThemeProvider = loadable(() => import('./ThemeProvider/index'));
const ImageUpload = loadable(() => import('./ImageUpload/index'));
const ColorPicker = loadable(() => import('./ColorPicker/index'));

export default EditorUI;
export {
  BottomToolbarProps,
  EditorUI,
  Trash,
  Toolbar,
  DisplayModeToggle,
  BottomToolbar,
  ThemeProvider,
  darkTheme,
  ImageUpload,
  ImageUploaded,
  ImageLoaded,
  ImageUploadType,
  ColorPicker,
  colorToString,
  RGBColor,
};
