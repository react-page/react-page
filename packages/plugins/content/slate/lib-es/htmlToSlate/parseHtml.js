import { DOMParser } from '@xmldom/xmldom';
export default (function (html) {
    return new DOMParser().parseFromString(html, 'text/html');
});
//# sourceMappingURL=parseHtml.js.map