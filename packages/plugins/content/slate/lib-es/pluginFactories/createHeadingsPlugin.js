import createSimpleHtmlBlockPlugin from './createSimpleHtmlBlockPlugin';
// eslint-disable-next-line @typescript-eslint/ban-types
function createHeadingsPlugin(def) {
    return createSimpleHtmlBlockPlugin({
        type: def.type,
        hotKey: 'mod+' + def.level,
        replaceWithDefaultOnRemove: true,
        icon: def.icon,
        label: "Heading ".concat(def.level),
        tagName: ('h' + def.level),
    });
}
export default createHeadingsPlugin;
//# sourceMappingURL=createHeadingsPlugin.js.map