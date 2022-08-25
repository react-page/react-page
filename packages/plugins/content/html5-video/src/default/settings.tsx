import React, { lazy } from 'react';
import type { Html5VideoSettings } from '../types/settings';

const PlayArrow = lazy(() => import('@mui/icons-material/PlayArrow'));

export const defaultTranslations = {
  pluginName: 'HTML 5 Video',
  pluginDescription: 'Add webm, ogg and other HTML5 video',
  urlLabel: 'Video url',
  urlPlaceholder: 'https://example.com/video.webm',
  isInlineable: true,
};

export const defaultSettings: Html5VideoSettings = {
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
  icon: <PlayArrow />,
};
