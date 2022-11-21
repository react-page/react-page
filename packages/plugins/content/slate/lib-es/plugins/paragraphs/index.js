import createComponentPlugin from '../../pluginFactories/createComponentPlugin';
export var getAlignmentFromElement = function (el) {
    var _a;
    var align = (_a = el === null || el === void 0 ? void 0 : el.style) === null || _a === void 0 ? void 0 : _a.textAlign;
    if (align) {
        return {
            align: align,
        };
    }
};
export default {
    paragraph: createComponentPlugin({
        type: 'PARAGRAPH/PARAGRAPH',
        label: 'Paragraph',
        object: 'block',
        addToolbarButton: false,
        addHoverButton: false,
        deserialize: {
            tagName: 'p',
            getData: getAlignmentFromElement,
        },
        getStyle: function (_a) {
            var align = _a.align;
            return ({ textAlign: align });
        },
        Component: 'p',
    }),
    // currently only for deserialize
    pre: createComponentPlugin({
        type: 'PARAGRAPH/PRE',
        label: 'Pre',
        object: 'block',
        addToolbarButton: false,
        addHoverButton: false,
        deserialize: {
            tagName: 'pre',
            getData: getAlignmentFromElement,
        },
        getStyle: function (_a) {
            var align = _a.align;
            return ({ textAlign: align });
        },
        Component: 'pre',
    }),
};
//# sourceMappingURL=index.js.map