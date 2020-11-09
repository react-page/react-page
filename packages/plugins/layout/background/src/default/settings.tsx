import * as React from 'react';
import { BackgroundSettings } from '../types/settings';
import {
  IMAGE_MODE_FLAG,
  COLOR_MODE_FLAG,
  GRADIENT_MODE_FLAG,
} from './../const/mode';
import { defaultTranslations as defaultImageUploadTranslations } from '@react-page/editor/lib/ui/ImageUpload/defaultTranslations';

export const defaultTranslations = {
  ...defaultImageUploadTranslations,
  imageMode: 'Image',
  colorMode: 'Color',
  gradientMode: 'Gradient',
  lighten: 'Lighten',
  darken: 'Darken',
  usePadding: 'Use Padding',
  onOff: 'ON/OFF',
  gradientRotation: 'Gradient rotation',
  degrees: 'deg',
  gradientOpacity: 'Gradient opacity',
  addColor: 'Add color',
  addGradient: 'Add gradient',
  pluginName: 'Background',
  pluginDescription: '',
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
};
