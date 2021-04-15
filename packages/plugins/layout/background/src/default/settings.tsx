import React from 'react';
import type { BackgroundSettings } from '../types/settings';
import {
  IMAGE_MODE_FLAG,
  COLOR_MODE_FLAG,
  GRADIENT_MODE_FLAG,
} from './../const/mode';
// import { defaultTranslations as defaultImageUploadTranslations } from '@react-page/editor/lib/ui/ImageUpload/defaultTranslations';

export const defaultTranslations = {
  // Strings used in ImageUpload module
  buttonContent: 'Choose for upload',
  noFileError: 'No file selected',
  badExtensionError: 'Wrong file type',
  tooBigError: 'Image file > 5MB',
  uploadingError: 'Error while uploading',
  unknownError: 'Unknown error',

  imageMode: 'Image',
  colorMode: 'Single color',
  gradientMode: 'Gradient color',
  lighten: 'Lighten',
  darken: 'Darken',
  usePadding: 'Use inner padding',
  onOff: 'Enable this panel',
  gradientRotation: 'Gradient rotation',
  degrees: 'deg',
  gradientOpacity: 'Gradient opacity',
  addColor: 'Add color',
  addGradient: 'Add another gradient',
  pluginName: 'Background',
  pluginDescription: 'Add background color, image or gradient',
  or: 'OR',
  haveUrl: 'Existing image URL',
  srcPlaceholder: 'http://example.com/image.png',
  imageUrl: 'Image URL',
  isParallax: 'Use parallax effect'
};

export const defaultSettings: Partial<BackgroundSettings> = {
  defaultBackgroundColor: { r: 245, g: 0, b: 87, a: 1 },
  defaultGradientColor: { r: 245, g: 0, b: 87, a: 1 },
  defaultGradientSecondaryColor: { r: 71, g: 245, b: 87, a: 1 },
  defaultMode: 1,
  defaultModeFlag: 1,
  defaultDarken: 0.1,
  defaultLighten: 0,
  defaultHasPadding: true,
  defaultIsParallax: true,
  translations: defaultTranslations,
  enabledModes: IMAGE_MODE_FLAG | COLOR_MODE_FLAG | GRADIENT_MODE_FLAG,
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  cellStyle: {
    padding: 0,
  },
};
