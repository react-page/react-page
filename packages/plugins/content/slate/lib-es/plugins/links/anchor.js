import React from 'react';
import createDataPlugin from '../../pluginFactories/createDataPlugin';
var anchor = createDataPlugin({
    addHoverButton: false,
    addToolbarButton: true,
    object: 'block',
    label: 'Id for Link Anchor',
    icon: React.createElement("span", null, "#"),
    properties: ['id'],
    dataMatches: function (data) {
        return Boolean(data === null || data === void 0 ? void 0 : data.id);
    },
    controls: {
        type: 'autoform',
        schema: {
            type: 'object',
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                },
            },
        },
    },
});
export default anchor;
//# sourceMappingURL=anchor.js.map