import forEach from 'lodash/collection/forEach';

/**
 * Returns a subset (as a copy) of the given object.
 *
 * @example
 * console.log(subset({foo: 1, bar: 2}, ['bar']); // {bar: 2}
 *
 * @param {Object} a
 * @param {Array} props
 * @returns {Object}
 */
export default function(a, props) {
    var result = {};
    forEach(props, (prop) => {
        result[prop] = a[prop];
    });
    return result;
}
