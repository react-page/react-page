import React from 'react';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';
var Editable = function () {
    return (React.createElement(FallbackDropArea, null,
        React.createElement(Inner, null)));
};
export default React.memo(Editable);
//# sourceMappingURL=index.js.map