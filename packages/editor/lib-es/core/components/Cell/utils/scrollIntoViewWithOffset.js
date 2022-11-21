export default (function (element, offset, behavior) {
    if (offset === void 0) { offset = 0; }
    if (behavior === void 0) { behavior = 'smooth'; }
    if (!element) {
        return;
    }
    var bodyRect = document.body.getBoundingClientRect().top;
    var elementRect = element.getBoundingClientRect().top;
    var elementPosition = elementRect - bodyRect;
    var offsetPosition = elementPosition - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: behavior,
    });
});
//# sourceMappingURL=scrollIntoViewWithOffset.js.map