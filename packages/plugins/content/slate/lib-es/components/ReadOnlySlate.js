import React from 'react';
import { SlateReactPresentation } from 'slate-react-presentation';
import { useRenderElement, useRenderLeave } from './renderHooks';
var ReadOnlySlate = function (props) {
    var plugins = props.plugins, defaultPluginType = props.defaultPluginType;
    var renderElement = useRenderElement({
        plugins: plugins,
        defaultPluginType: defaultPluginType,
    }, []);
    var renderLeaf = useRenderLeave({ plugins: plugins, readOnly: true }, []);
    // the div around is required to be consistent in styling with the default editor
    return (React.createElement("div", { style: {
            position: 'relative',
            outline: 'none',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
        } },
        React.createElement(SlateReactPresentation, { renderElement: renderElement, renderLeaf: renderLeaf, value: props.data.slate, LeafWrapper: React.Fragment })));
};
export default React.memo(ReadOnlySlate);
//# sourceMappingURL=ReadOnlySlate.js.map