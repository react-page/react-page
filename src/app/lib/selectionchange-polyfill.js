/*
 This is free and unencumbered software released into the public domain.

 Anyone is free to copy, modify, publish, use, compile, sell, or
 distribute this software, either in source code form or as a compiled
 binary, for any purpose, commercial or non-commercial, and by any
 means.

 In jurisdictions that recognize copyright laws, the author or authors
 of this software dedicate any and all copyright interest in the
 software to the public domain. We make this dedication for the benefit
 of the public at large and to the detriment of our heirs and
 successors. We intend this dedication to be an overt act of
 relinquishment in perpetuity of all present and future rights to this
 software under copyright law.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 For more information, please refer to <http://unlicense.org>
 */

// github.com/2is10/selectionchange-polyfill

export default function (undefined) {
    var MAC = /^Mac/.test(navigator.platform);
    var MAC_MOVE_KEYS = [65, 66, 69, 70, 78, 80]; // A, B, E, F, P, N from support.apple.com/en-ie/HT201236
    var SELECT_ALL_MODIFIER = MAC ? 'metaKey' : 'ctrlKey';
    var RANGE_PROPS = ['startContainer', 'startOffset', 'endContainer', 'endOffset'];
    var HAS_OWN_SELECTION = {INPUT: 1, TEXTAREA: 1};

    var ranges;

    return {
        start: function (doc) {
            var d = doc || document;
            if (ranges || !hasNativeSupport(d) && (ranges = newWeakMap())) {
                if (!ranges.has(d)) {
                    ranges.set(d, getSelectionRange(d));
                    on(d, 'input', onInput);
                    on(d, 'keydown', onKeyDown);
                    on(d, 'mousedown', onMouseDown);
                    on(d, 'mousemove', onMouseMove);
                    on(d, 'mouseup', onMouseUp);
                    on(d.defaultView, 'focus', onFocus);
                }
            }
        },
        stop: function (doc) {
            var d = doc || document;
            if (ranges && ranges.has(d)) {
                ranges['delete'](d);
                off(d, 'input', onInput);
                off(d, 'keydown', onKeyDown);
                off(d, 'mousedown', onMouseDown);
                off(d, 'mousemove', onMouseMove);
                off(d, 'mouseup', onMouseUp);
                off(d.defaultView, 'focus', onFocus);
            }
        }
    };

    function hasNativeSupport(doc) {
        var osc = doc.onselectionchange;
        if (osc !== undefined) {
            try {
                doc.onselectionchange = 0;
                return doc.onselectionchange === null;
            } catch (e) {
            } finally {
                doc.onselectionchange = osc;
            }
        }
        return false;
    }

    function newWeakMap() {
        if (typeof WeakMap !== 'undefined') {
            return new WeakMap();
        } else {
            console.error('selectionchange: WeakMap not supported');
            return null;
        }
    }

    function getSelectionRange(doc) {
        var s = doc.getSelection();
        return s.rangeCount ? s.getRangeAt(0) : null;
    }

    function on(el, eventType, handler) {
        el.addEventListener(eventType, handler, true);
    }

    function off(el, eventType, handler) {
        el.removeEventListener(eventType, handler, true);
    }

    function onInput(e) {
        if (!HAS_OWN_SELECTION[e.target.tagName]) {
            dispatchIfChanged(this, true);
        }
    }

    function onKeyDown(e) {
        var code = e.keyCode;
        if (code === 65 && e[SELECT_ALL_MODIFIER] && !e.shiftKey && !e.altKey || // Ctrl-A or Cmd-A
            code >= 37 && code <= 40 || // arrow key
            e.ctrlKey && MAC && MAC_MOVE_KEYS.indexOf(code) >= 0) {
            if (!HAS_OWN_SELECTION[e.target.tagName]) {
                setTimeout(dispatchIfChanged.bind(null, this), 0);
            }
        }
    }

    function onMouseDown(e) {
        if (e.button === 0) {
            on(this, 'mousemove', onMouseMove);
            setTimeout(dispatchIfChanged.bind(null, this), 0);
        }
    }

    function onMouseMove(e) {  // only needed while primary button is down
        if (e.buttons & 1) {
            dispatchIfChanged(this);
        } else {
            off(this, 'mousemove', onMouseMove);
        }
    }

    function onMouseUp(e) {
        if (e.button === 0) {
            setTimeout(dispatchIfChanged.bind(null, this), 0);
        } else {
            off(this, 'mousemove', onMouseMove);
        }
    }

    function onFocus() {
        setTimeout(dispatchIfChanged.bind(null, this.document), 0);
    }

    function dispatchIfChanged(doc, force) {
        var r = getSelectionRange(doc);
        if (force || !sameRange(r, ranges.get(doc))) {
            ranges.set(doc, r);
            setTimeout(doc.dispatchEvent.bind(doc, new Event('selectionchange')), 0);
        }
    }

    function sameRange(r1, r2) {
        return r1 === r2
            || r1 && r2
            && RANGE_PROPS.every(function (prop) {
                return r1[prop] === r2[prop];
            });
    }
};
