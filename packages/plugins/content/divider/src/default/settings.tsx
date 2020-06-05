import React from 'react';

export const defaultTranslations = {
  pluginName: 'Divider',
  pluginDescription: 'A horizontal divider',
};

export const defaultSettings = {
  translations: defaultTranslations,
  Controls: () => <>Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer for this plugin was not provided</>,
};
