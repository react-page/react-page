export default (function (html) {
    if (typeof DOMParser === 'undefined') {
        throw new Error('The native `DOMParser` global which the `Html` serializer uses by default is not present in this environment. You must supply the `options.parseHtml` function instead.');
    }
    return new DOMParser().parseFromString(html, 'text/html');
});
//# sourceMappingURL=parseHtml.browser.js.map