import * as React from 'react';
import { VideoSettings } from '../types/settings';

export const defaultSettings: VideoSettings = {
  label: 'Video location (YouTube / Vimeo)',
  placeholder: 'https://www.youtube.com/watch?v=ER97mPHhgtM',
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
};
