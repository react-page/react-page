import * as React from 'react';
import { Html5VideoSettings } from '../types/settings';
import { lazyLoad } from '@react-page/core';

const PlayArrow = lazyLoad(() => import('@material-ui/icons/PlayArrow'));

export const defaultTranslations = {
  pluginName: 'HTML 5 Video',
  pluginDescription: 'Add webm, ogg and other HTML5 video',
  urlLabel: 'Video url',
  urlPlaceholder: 'https://example.com/video.webm',
  isInlineable: true,
};

export const defaultSettings: Html5VideoSettings = {
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
  IconComponent: <PlayArrow />,
};
