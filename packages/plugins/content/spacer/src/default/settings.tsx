import * as React from 'react';
import { SpacerSettings } from '../types/settings';

export const defaultTranslations = {
  pluginName: 'Spacer',
  pluginDescription: 'Resizeable, empty space.',
  elementHeightLabel: 'Element height (px)',
};

export const defaultSettings: SpacerSettings = {
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
};
