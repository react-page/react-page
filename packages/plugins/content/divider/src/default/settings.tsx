import React from 'react';

export const defaultTranslations = {
  pluginName: 'Divider',
  pluginDescription: 'A horizontal divider',
};

export const defaultSettings = {
  translations: defaultTranslations,
  Renderer: () => <>Renderer for this plugin was not provided</>,
};
