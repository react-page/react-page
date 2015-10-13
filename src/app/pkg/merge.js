import forEach from 'lodash/collection/forEach';

export default (array) => {
    let result = [];
    forEach(array, (elements) => {
        forEach(elements, (e) => {
            result.push(e);
        });
    });
    return result;
}
