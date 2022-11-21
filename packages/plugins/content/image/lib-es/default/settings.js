import React from 'react';
import { lazyLoad } from '@react-page/editor';
var Panorama = lazyLoad(function () { return import('@mui/icons-material/Panorama'); });
export var defaultTranslations = {
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
export var defaultSettings = {
    Controls: function () { return React.createElement(React.Fragment, null, " Controls for this plugin were not provided"); },
    Renderer: function () { return React.createElement(React.Fragment, null, "Renderer; for this plugin was not provided "); },
    translations: defaultTranslations,
    icon: React.createElement(Panorama, null),
};
//# sourceMappingURL=settings.js.map