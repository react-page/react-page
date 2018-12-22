import * as React from 'react';
import { ImageSettings } from '../types/settings';

export const defaultSettings: ImageSettings = {
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
};
