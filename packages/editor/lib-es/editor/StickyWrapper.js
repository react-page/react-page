var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useState } from 'react';
import { useOption } from '..';
var StickyWrapper = function (_a) {
    var children = _a.children;
    var ref = React.createRef();
    var sidebarPosition = useOption('sidebarPosition');
    var stickyElRef = React.createRef();
    var _b = __read(useState(false), 2), shouldStickToTop = _b[0], setShouldStickToTop = _b[1];
    var _c = __read(useState(true), 2), shouldStickToBottom = _c[0], setShouldStickToBottom = _c[1];
    var _d = __read(useState(0), 2), rightOffset = _d[0], setRightOffset = _d[1];
    var _e = __read(useState(0), 2), rightOffsetFixed = _e[0], setRightOffsetFixed = _e[1];
    React.useEffect(function () {
        var calc = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (ref.current) {
                /**
                 * TODO: works, but needs refactor, could calculate style for sidebar directly
                 */
                var _q = ref.current.getBoundingClientRect(), top_1 = _q.top, left = _q.left, right = _q.right;
                var bottom = top_1 + ref.current.clientHeight;
                // document.documentElement.clientWidth is without scrollbars, so better for us
                if (sidebarPosition === 'rightAbsolute') {
                    var rightOffsetAbsolute = document.documentElement.clientWidth -
                        left -
                        ref.current.clientWidth;
                    setRightOffset(rightOffsetAbsolute);
                    setRightOffsetFixed(0);
                }
                else if (sidebarPosition === 'rightRelative') {
                    var rightOffsetAbsolute = document.documentElement.clientWidth -
                        left -
                        ref.current.clientWidth;
                    var rightOffsetRelative = (_b = (_a = stickyElRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0;
                    var overlapsScreenRight = right + ((_d = (_c = stickyElRef.current) === null || _c === void 0 ? void 0 : _c.clientWidth) !== null && _d !== void 0 ? _d : 0) >
                        document.documentElement.clientWidth;
                    setRightOffset(overlapsScreenRight ? rightOffsetAbsolute : rightOffsetRelative);
                    setRightOffsetFixed(overlapsScreenRight
                        ? 0
                        : document.documentElement.clientWidth -
                            right -
                            ((_f = (_e = stickyElRef.current) === null || _e === void 0 ? void 0 : _e.clientWidth) !== null && _f !== void 0 ? _f : 0));
                }
                else if (sidebarPosition === 'leftRelative') {
                    var rightOffsetForRelativeLeft = -ref.current.clientWidth;
                    var rightOffsetForAbsoluteLeft = -ref.current.clientWidth -
                        left +
                        ((_h = (_g = stickyElRef.current) === null || _g === void 0 ? void 0 : _g.clientWidth) !== null && _h !== void 0 ? _h : 100);
                    var overlapsScreenLeft = right + rightOffsetForRelativeLeft <
                        ((_k = (_j = stickyElRef.current) === null || _j === void 0 ? void 0 : _j.clientWidth) !== null && _k !== void 0 ? _k : 0);
                    setRightOffset(overlapsScreenLeft
                        ? rightOffsetForAbsoluteLeft
                        : rightOffsetForRelativeLeft);
                    setRightOffsetFixed(document.documentElement.clientWidth - left);
                }
                else if (sidebarPosition === 'leftAbsolute') {
                    console.warn('sidebarPosition leftAbsolute is currently buggy');
                    var rightOffsetForAbsoluteLeft = -ref.current.clientWidth -
                        left +
                        ((_m = (_l = stickyElRef.current) === null || _l === void 0 ? void 0 : _l.clientWidth) !== null && _m !== void 0 ? _m : 100);
                    setRightOffset(rightOffsetForAbsoluteLeft);
                    setRightOffsetFixed(document.documentElement.clientWidth -
                        ((_p = (_o = stickyElRef.current) === null || _o === void 0 ? void 0 : _o.clientWidth) !== null && _p !== void 0 ? _p : 0));
                }
                var uiHeight = stickyElRef.current
                    ? stickyElRef.current.clientHeight
                    : 400;
                setShouldStickToTop(top_1 > window.innerHeight - uiHeight);
                setShouldStickToBottom(bottom < window.innerHeight);
            }
        };
        document.addEventListener('scroll', calc);
        window.addEventListener('resize', calc);
        var observer = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (global.IntersectionObserver) {
            observer = new IntersectionObserver(calc);
            if (ref.current) {
                observer.observe(ref.current);
            }
        }
        // do it once
        calc();
        return function () {
            document.removeEventListener('scroll', calc);
            window.removeEventListener('resize', calc);
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
        };
    }, [ref, stickyElRef]);
    return (React.createElement("div", { style: { position: 'relative' }, ref: ref }, children({
        rightOffset: rightOffset,
        stickyElRef: stickyElRef,
        focusRef: ref,
        shouldStickToTop: shouldStickToTop,
        shouldStickToBottom: shouldStickToBottom,
        rightOffsetFixed: rightOffsetFixed,
    })));
};
export default StickyWrapper;
//# sourceMappingURL=StickyWrapper.js.map