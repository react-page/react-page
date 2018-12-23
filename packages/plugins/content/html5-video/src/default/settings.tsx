import * as React from 'react';
import { Html5VideoSettings } from '../types/settings';

export const defaultSettings: Html5VideoSettings = {
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
};
