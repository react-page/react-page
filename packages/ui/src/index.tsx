// something is wrong with lerna, typescript and this import: import { lazyLoad } from '@react-page/core';
import loadable from '@loadable/component';
import { colorToString } from './ColorPicker/colorToString';

import darkTheme from './ThemeProvider/DarkTheme';
const Trash = loadable(() => import('./Trash/index'));
const Toolbar = loadable(() => import('./Toolbar/index'));
const DisplayModeToggle = loadable(() => import('./DisplayModeToggle/index'));
const BottomToolbar = loadable(() => import('./BottomToolbar/index'));
const EditorUI = loadable(() => import('./EditorUI/index'));

const ThemeProvider = loadable(() => import('./ThemeProvider/index'));
const ImageUpload = loadable(() => import('./ImageUpload/index'));
const ColorPicker = loadable(() => import('./ColorPicker/index'));
const Provider = loadable(() => import('./Provider'));

export default EditorUI;
export {
  EditorUI,
  Provider,
  Trash,
  Toolbar,
  DisplayModeToggle,
  BottomToolbar,
  ThemeProvider,
  darkTheme,
  ImageUpload,
  ColorPicker,
  colorToString,
};
