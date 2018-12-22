import * as React from 'react';
import { SpacerSettings } from '../types/settings';

export const defaultSettings: SpacerSettings = {
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
};
