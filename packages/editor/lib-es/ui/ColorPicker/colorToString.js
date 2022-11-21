import parse from 'color-parse';
export var colorToString = function (c) {
    return c ? 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')' : undefined;
};
export var stringToColor = function (c) {
    var match = parse(c);
    if (!match || match.space !== 'rgb')
        return null;
    return {
        r: match.values[0],
        g: match.values[1],
        b: match.values[2],
        a: match.alpha,
    };
};
//# sourceMappingURL=colorToString.js.map