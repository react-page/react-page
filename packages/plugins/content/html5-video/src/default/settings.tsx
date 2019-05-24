import * as React from 'react';
import { Html5VideoSettings } from '../types/settings';

export const defaultTranslations = {
  pluginName: 'HTML 5 Video',
  pluginDescription: 'Add webm, ogg and other HTML5 video',
  urlLabel: 'Video url',
  urlPlaceholder: 'https://example.com/video.webm',
};

export const defaultSettings: Html5VideoSettings = {
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
};
