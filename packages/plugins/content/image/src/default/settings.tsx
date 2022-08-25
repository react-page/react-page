import React, { lazy, Suspense } from 'react';

import type { ImageSettings } from '../types/settings';
const Panorama = lazy(() => import('@mui/icons-material/Panorama'));

export const defaultTranslations = {
  pluginName: 'Image',
  pluginDescription: 'Loads an image from an url.',
  or: 'OR',
  haveUrl: 'Existing image URL',
  imageUrl: 'Image URL',
  hrefPlaceholder: 'http://example.com',
  hrefLabel: 'Link to open upon image click',
  altPlaceholder: "Image's description",
  altLabel: "Image's alternative description",
  openNewWindow: 'Open link in new window',
  srcPlaceholder: 'http://example.com/image.png',

  // Strings used in ImageUpload
  buttonContent: 'Choose for upload',
  noFileError: 'No file selected',
  badExtensionError: 'Wrong file type',
  tooBigError: 'Image file > 5MB',
  uploadingError: 'Error while uploading',
  unknownError: 'Unknown error',
};

export const defaultSettings: ImageSettings = {
  Controls: () => <> Controls for this plugin were not provided</>,
  Renderer: () => <>Renderer; for this plugin was not provided </>,
  translations: defaultTranslations,
  icon: <Panorama />,
};
