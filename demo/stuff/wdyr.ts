import React from 'react';

if (process.env.NODE_ENV === 'development' && process.env.WDYU) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    exclude: [/PluginButton/], // PluginButton rerenders a lot because of slate
    trackExtraHooks: [[require('react-redux/lib'), 'useSelector']],
  });
}
