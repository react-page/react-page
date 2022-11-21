import React from 'react';
export var ConditionalWrapper = function (_a) {
    var condition = _a.condition, wrapper = _a.wrapper, children = _a.children;
    return (React.createElement(React.Fragment, null, condition ? wrapper(children) : children));
};
//# sourceMappingURL=ConditionalWrapper.js.map