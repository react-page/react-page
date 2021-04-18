import React from 'react';
import type { SpacerSettings } from '../types/settings';

export const defaultTranslations = {
  pluginName: 'Spacer',
  pluginDescription: 'Resizeable, horizontal and vertical empty space.',
  elementHeightLabel: 'Element height (px)',
};

export const defaultSettings: SpacerSettings = {
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
};
