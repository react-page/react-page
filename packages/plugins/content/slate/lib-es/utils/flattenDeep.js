// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function flattenDeep(arr1) {
    if (!Array.isArray(arr1)) {
        return [arr1];
    }
    return arr1.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (acc, val) {
        return Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val);
    }, []);
}
//# sourceMappingURL=flattenDeep.js.map