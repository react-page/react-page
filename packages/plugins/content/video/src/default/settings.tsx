import React, { lazy } from 'react';
import type { VideoSettings } from '../types/settings';

const PlayArrow = lazy(() => import('@mui/icons-material/PlayArrow'));

export const defaultTranslations = {
  pluginName: 'Video',
  pluginDescription: 'Include videos from Vimeo or YouTube',
  label: 'Video location (YouTube / Vimeo)',
  placeholder: 'https://www.youtube.com/watch?v=ER97mPHhgtM',
};

export const defaultSettings: VideoSettings = {
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
  icon: <PlayArrow />,
};
