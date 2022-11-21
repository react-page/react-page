// poor check
export var objIsNode = function (obj) {
    if (!obj)
        return false;
    if (!('id' in obj)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=objIsNode.js.map