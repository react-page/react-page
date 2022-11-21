import React from 'react';
if (process.env.NODE_ENV === 'development') {
    var whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}
//# sourceMappingURL=wdyr.js.map