/**
 * A list of positions in the layout space.
 */
export var PositionEnum;
(function (PositionEnum) {
    PositionEnum["LEFT_OF"] = "left-of";
    PositionEnum["RIGHT_OF"] = "right-of";
    PositionEnum["ABOVE"] = "above";
    PositionEnum["BELOW"] = "below";
    PositionEnum["INLINE_LEFT"] = "inline-left";
    PositionEnum["INLINE_RIGHT"] = "inline-right";
})(PositionEnum || (PositionEnum = {}));
/**
 * Is true if built in production mode.
 */
export var isProduction = process.env.NODE_ENV === 'production';
//# sourceMappingURL=const.js.map