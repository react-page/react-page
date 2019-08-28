// something is wrong with lerna, typescript and this import: import { lazyLoad } from '@react-page/core';
import loadable from '@loadable/component';
import React from 'react';
import darkTheme from './ThemeProvider/DarkTheme';
const Trash = loadable(() => import('./Trash/index'));
const Toolbar = loadable(() => import('./Toolbar/index'));
const DisplayModeToggle = loadable(() => import('./DisplayModeToggle/index'));
const BottomToolbar = loadable(() => import('./BottomToolbar/index'));
const ThemeProvider = loadable(() => import('./ThemeProvider/index'));
const ImageUpload = loadable(() => import('./ImageUpload/index'));
const ColorPicker = loadable(() => import('./ColorPicker/index'));

import { colorToString } from './ColorPicker/colorToString';

const Provider = loadable(() => import('./Provider'));

export default ({ editor }) => (
  <Provider editor={editor}>
    <Trash />
    <DisplayModeToggle />
    <Toolbar />
  </Provider>
);
export {
  Provider,
  Trash,
  Toolbar,
  DisplayModeToggle,
  BottomToolbar,
  ThemeProvider,
  darkTheme,
  ImageUpload,
  ColorPicker,
  colorToString
};
