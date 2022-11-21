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
import { colorToString } from '@react-page/editor';
import React from 'react';
import { ModeEnum } from '../types/ModeEnum';
var getStyles = function (props) {
    var _a = props.data, _b = _a === void 0 ? {} : _a, _c = _b.background, background = _c === void 0 ? '' : _c, _d = _b.modeFlag, modeFlag = _d === void 0 ? props.defaultModeFlag : _d, _e = _b.isParallax, isParallax = _e === void 0 ? true : _e, _f = _b.backgroundColor, backgroundColor = _f === void 0 ? props.defaultBackgroundColor : _f, _g = _b.gradients, gradients = _g === void 0 ? [] : _g;
    var styles = {};
    if (modeFlag && modeFlag & ModeEnum.GRADIENT_MODE_FLAG) {
        var usedGradients = gradients.filter(function (g) { return g.colors && g.colors.length; });
        var usedGradientsString = usedGradients
            .map(function (g, i) {
            var _a, _b, _c;
            var firstColor = (_a = g.colors) === null || _a === void 0 ? void 0 : _a[0].color;
            var firstColorStr = colorToString(firstColor);
            var deg = i === props.gradientDegPreviewIndex &&
                props.gradientDegPreview !== undefined
                ? props.gradientDegPreview
                : g.deg;
            var opacity = i === props.gradientOpacityPreviewIndex &&
                props.gradientOpacityPreview !== undefined
                ? props.gradientOpacityPreview
                : g.opacity;
            return ('linear-gradient(' +
                deg +
                'deg, ' +
                (((_b = g === null || g === void 0 ? void 0 : g.colors) === null || _b === void 0 ? void 0 : _b.length) !== 1
                    ? (_c = g === null || g === void 0 ? void 0 : g.colors) === null || _c === void 0 ? void 0 : _c.map(function (c, cpIndex) {
                        var color = i === props.gradientColorPreviewIndex &&
                            cpIndex === props.gradientColorPreviewColorIndex &&
                            props.gradientColorPreview !== undefined
                            ? props.gradientColorPreview
                            : c.color;
                        if (!color) {
                            return 'transparent';
                        }
                        var colorWithOpacity = __assign(__assign({}, color), { a: color.a !== undefined ? color.a * opacity : opacity });
                        return colorToString(colorWithOpacity);
                    }).join(', ')
                    : firstColorStr + ', ' + firstColorStr) +
                ')');
        })
            .join(', ');
        if (usedGradientsString !== '') {
            styles = __assign(__assign({}, styles), { background: usedGradientsString });
        }
    }
    if (modeFlag && modeFlag & ModeEnum.COLOR_MODE_FLAG) {
        var colorStr = colorToString(props.backgroundColorPreview
            ? props.backgroundColorPreview
            : backgroundColor);
        var modeStr = "linear-gradient(".concat(colorStr, ", ").concat(colorStr, ")");
        styles = __assign(__assign({}, styles), { background: styles.background
                ? styles.background + ', ' + modeStr
                : modeStr });
    }
    if (modeFlag && modeFlag & ModeEnum.IMAGE_MODE_FLAG) {
        var backgroundFinal = props.imagePreview
            ? props.imagePreview.dataUrl
            : background;
        var modeStr = "url('".concat(backgroundFinal, "') center / cover no-repeat") +
            (isParallax ? ' fixed' : '');
        styles = __assign(__assign({}, styles), { background: styles.background
                ? styles.background + ', ' + modeStr
                : modeStr });
    }
    return styles;
};
var BackgroundHtmlRenderer = function (props) {
    var children = props.children, _a = props.data, _b = _a === void 0 ? {} : _a, _c = _b.darken, darken = _c === void 0 ? props.defaultDarken : _c, _d = _b.lighten, lighten = _d === void 0 ? props.defaultLighten : _d, _e = _b.hasPadding, hasPadding = _e === void 0 ? props.defaultHasPadding : _e;
    var darkenFinal = props.darkenPreview !== undefined ? props.darkenPreview : darken;
    var lightenFinal = props.lightenPreview !== undefined ? props.lightenPreview : lighten;
    var containerStyles = getStyles(props);
    return (React.createElement("div", { className: "react-page-plugins-layout-background", style: __assign(__assign({}, containerStyles), (hasPadding ? {} : { padding: 0 })) },
        React.createElement("div", { className: "react-page-plugins-layout-background__backstretch", style: {
                // tslint:disable-next-line:max-line-length
                backgroundImage: "linear-gradient(rgba(0, 0, 0, ".concat(darkenFinal, "), rgba(0, 0, 0, ").concat(darkenFinal, ")),linear-gradient(rgba(255, 255, 255, ").concat(lightenFinal, "), rgba(255, 255, 255, ").concat(lightenFinal, "))"),
            } }),
        children));
};
export default BackgroundHtmlRenderer;
//# sourceMappingURL=BackgroundHtmlRenderer.js.map