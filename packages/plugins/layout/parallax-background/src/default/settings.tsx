import * as React from 'react';
import { ParallaxBackgroundSettings } from '../types/settings';

export const defaultSettings: Partial<ParallaxBackgroundSettings> = {
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
};
