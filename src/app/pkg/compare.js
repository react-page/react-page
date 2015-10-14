import some from 'lodash/collection/some';

/**
 * Compares specific properties from object A with object B and returns true if all properties match.
 *
 * @example
 * console.log(compare({foo: 1}, {foo: 1, bar: 2}, ['foo']); // true
 * console.log(compare({foo: 1, bar: 2}, {foo: 1, bar: 2}, ['foo', 'bar']); // true
 * console.log(compare({foo: -1, bar: 2}, {foo: 3, bar: 2}, ['foo']); // false
 *
 * @param {Object} a
 * @param {Object} b
 * @param {Array} props
 * @returns {boolean}
 */
export default function(a, b, props) {
    var result = false;
    some(props, (prop) => {
        result = a[prop] === b[prop];
        return !result;
    });
    return result;
}
