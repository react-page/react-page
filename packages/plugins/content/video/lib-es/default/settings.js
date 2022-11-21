import React from 'react';
import { lazyLoad } from '@react-page/editor';
var PlayArrow = lazyLoad(function () { return import('@mui/icons-material/PlayArrow'); });
export var defaultTranslations = {
    pluginName: 'Video',
    pluginDescription: 'Include videos from Vimeo or YouTube',
    label: 'Video location (YouTube / Vimeo)',
    placeholder: 'https://www.youtube.com/watch?v=ER97mPHhgtM',
};
export var defaultSettings = {
    Renderer: function () { return React.createElement(React.Fragment, null, "Renderer; for this plugin was not provided "); },
    translations: defaultTranslations,
    icon: React.createElement(PlayArrow, null),
};
//# sourceMappingURL=settings.js.map