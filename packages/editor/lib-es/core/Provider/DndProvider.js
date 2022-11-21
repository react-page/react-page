import React from 'react';
import { DndProvider as DndProviderOrg } from 'react-dnd';
import { useOption } from '../components/hooks';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var DndProvider = function (_a) {
    var children = _a.children;
    var dndBackend = useOption('dndBackend');
    return dndBackend ? (React.createElement(DndProviderOrg, { backend: dndBackend }, children)) : (React.createElement(React.Fragment, null, children));
};
export default DndProvider;
//# sourceMappingURL=DndProvider.js.map