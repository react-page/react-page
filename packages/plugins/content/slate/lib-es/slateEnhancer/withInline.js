var withInline = function (plugins) { return function (editor) {
    var isInline = editor.isInline, isVoid = editor.isVoid;
    editor.isInline = function (element) {
        return plugins.some(function (plugin) {
            return plugin.pluginType === 'component' &&
                plugin.object === 'inline' &&
                plugin.type === element.type;
        })
            ? true
            : isInline(element);
    };
    editor.isVoid = function (element) {
        return plugins.some(function (plugin) {
            return plugin.pluginType === 'component' &&
                (plugin.object === 'block' || plugin.object === 'inline') &&
                plugin.type === element.type &&
                plugin.isVoid;
        })
            ? true
            : isVoid(element);
    };
    return editor;
}; };
export default withInline;
//# sourceMappingURL=withInline.js.map