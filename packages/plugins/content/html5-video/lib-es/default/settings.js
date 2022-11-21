import React from 'react';
import { lazyLoad } from '@react-page/editor';
var PlayArrow = lazyLoad(function () { return import('@mui/icons-material/PlayArrow'); });
export var defaultTranslations = {
    pluginName: 'HTML 5 Video',
    pluginDescription: 'Add webm, ogg and other HTML5 video',
    urlLabel: 'Video url',
    urlPlaceholder: 'https://example.com/video.webm',
    isInlineable: true,
};
export var defaultSettings = {
    Renderer: function () { return React.createElement(React.Fragment, null, "Renderer; for this plugin was not provided "); },
    translations: defaultTranslations,
    icon: React.createElement(PlayArrow, null),
};
//# sourceMappingURL=settings.js.map