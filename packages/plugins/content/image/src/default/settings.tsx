import * as React from 'react';
import { ImageSettings } from '../types/settings';

export const defaultTranslations = {
  pluginName: 'Image',
  pluginDescription: 'Loads an image from an url.',
  or: 'OR',
  haveUrl: 'I have a URL',
  imageUrl: 'Image URL',
  hrefPlaceholder: 'http://example.com',
  hrefLabel: 'Link location (url)',
  openNewWindow: 'Open in new window',
  srcPlaceholder: 'http://example.com/image.png',
};

export const defaultSettings: ImageSettings = {
  Controls: () => <> Controls for this plugin were not provided</> ,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
};
