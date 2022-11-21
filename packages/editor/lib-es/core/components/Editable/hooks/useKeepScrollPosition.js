import throttle from 'lodash.throttle';
import React, { useEffect } from 'react';
import scrollIntoViewWithOffset from '../../Cell/utils/scrollIntoViewWithOffset';
import { useDisplayMode } from '../../hooks';
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight ||
                document.documentElement.clientHeight) /*or $(window).height() */ &&
        rect.right <=
            (window.innerWidth ||
                document.documentElement.clientWidth) /*or $(window).width() */);
}
export var useKeepScrollPosition = function (ref) {
    var mode = useDisplayMode();
    var firstElementInViewPortref = React.useRef();
    useEffect(function () {
        var onScroll = throttle(function () {
            if (ref.current) {
                var firstInViewport = Array.prototype.find.call(ref.current.getElementsByClassName('react-page-cell'), function (cell) { return isElementInViewport(cell); });
                if (firstInViewport) {
                    firstElementInViewPortref.current = {
                        el: firstInViewport,
                        topOffset: firstInViewport.getBoundingClientRect().top,
                    };
                }
                else {
                    firstElementInViewPortref.current = undefined;
                }
            }
        }, 600);
        window.addEventListener('scroll', onScroll);
        return function () {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    useEffect(function () {
        if (firstElementInViewPortref.current) {
            var _a = firstElementInViewPortref.current, el_1 = _a.el, topOffset_1 = _a.topOffset;
            setTimeout(function () {
                scrollIntoViewWithOffset(el_1, topOffset_1, 'auto');
            }, 0);
        }
    }, [mode]);
};
//# sourceMappingURL=useKeepScrollPosition.js.map