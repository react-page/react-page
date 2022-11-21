var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import flatten from 'lodash.flatten';
import { jsx } from 'slate-hyperscript';
import parseHtml from './parseHtml';
var HtmlToSlate = function (_a) {
    var plugins = _a.plugins;
    var deserializeElement = function (el) {
        var _a;
        var _b, _c, _d, _e, _f;
        var nodename = el.nodeName.toUpperCase();
        if (el.nodeType === 3) {
            return el.textContent;
        }
        else if (el.nodeType !== 1) {
            return null;
        }
        else if (nodename === 'BR') {
            return '\n';
        }
        var nodeName = el.nodeName;
        var parent = el;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var children = flatten(Array.from(parent.childNodes).map(deserializeElement));
        if (nodename === 'BODY') {
            return jsx('fragment', {}, children);
        }
        var matchingPlugin = plugins.find(function (p) {
            var _a;
            return (p.pluginType === 'component' &&
                ((_a = p.deserialize) === null || _a === void 0 ? void 0 : _a.tagName) === nodeName.toLowerCase());
        });
        if (matchingPlugin && matchingPlugin.pluginType === 'component') {
            var elHtml = el;
            if (!elHtml.style) {
                // xmldom has no style attribute
                // we monkey patch it in for easier style parsing
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                elHtml.style = new (require('cssstyle').CSSStyleDeclaration)();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                elHtml.style.cssText = elHtml.getAttribute('style');
            }
            if (matchingPlugin.object === 'mark') {
                var attrs_1 = (_a = {},
                    _a[matchingPlugin.type] = (_d = (_c = (_b = matchingPlugin === null || matchingPlugin === void 0 ? void 0 : matchingPlugin.deserialize) === null || _b === void 0 ? void 0 : _b.getData) === null || _c === void 0 ? void 0 : _c.call(_b, elHtml)) !== null && _d !== void 0 ? _d : true,
                    _a);
                return children.map(function (child) { return jsx('text', attrs_1, child); });
            }
            else {
                var data = (_f = (_e = matchingPlugin === null || matchingPlugin === void 0 ? void 0 : matchingPlugin.deserialize) === null || _e === void 0 ? void 0 : _e.getData) === null || _f === void 0 ? void 0 : _f.call(_e, elHtml);
                var attrs = __assign({ type: matchingPlugin.type }, (data ? { data: data } : {}));
                return jsx('element', attrs, children);
            }
        }
        return children;
    };
    return function (htmlString) {
        var parsed = parseHtml('<body>' + htmlString + '</body>');
        var fragment = deserializeElement(parsed.documentElement
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
        var nodes = Array.isArray(fragment) ? fragment : [fragment];
        // filter empty nodes (that contain only text)
        return {
            slate: nodes.filter(function (n) { var _a, _b; return (_b = ((_a = n.text) === null || _a === void 0 ? void 0 : _a.trim()) !== '') !== null && _b !== void 0 ? _b : true; }),
        };
    };
};
export default HtmlToSlate;
//# sourceMappingURL=HtmlToSlate.js.map