import * as React from 'react';
import { VideoSettings } from '../types/settings';
import { lazyLoad } from '@react-page/core';

const PlayArrow = lazyLoad(() => import('@material-ui/icons/PlayArrow'));

export const defaultTranslations = {
  pluginName: 'Video',
  pluginDescription: 'Include videos from Vimeo or YouTube',
  label: 'Video location (YouTube / Vimeo)',
  placeholder: 'https://www.youtube.com/watch?v=ER97mPHhgtM',
};

export const defaultSettings: VideoSettings = {
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
  IconComponent: <PlayArrow />,
};
