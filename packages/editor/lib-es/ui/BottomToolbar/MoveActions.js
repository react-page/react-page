import React from 'react';
import { MoveLeft, MoveRight, MoveDown, MoveUp } from '../moveButtons';
var MoveActions = function (_a) {
    var nodeId = _a.nodeId;
    return (React.createElement("div", { style: { transform: 'scale(0.8)' } },
        React.createElement(MoveLeft, { nodeId: nodeId }),
        React.createElement(MoveUp, { nodeId: nodeId }),
        React.createElement(MoveDown, { nodeId: nodeId }),
        React.createElement(MoveRight, { nodeId: nodeId })));
};
export default MoveActions;
//# sourceMappingURL=MoveActions.js.map