import createSimpleHtmlBlockPlugin from './createSimpleHtmlBlockPlugin';
export default function (def) {
    return createSimpleHtmlBlockPlugin({
        noButton: true,
        tagName: def.tagName,
        type: def.type,
    });
}
//# sourceMappingURL=createListItemPlugin.js.map