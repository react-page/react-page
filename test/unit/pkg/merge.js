import merge from 'app/pkg/merge';
import forEach from 'lodash/collection/forEach';

const cases = [
    {test: [['foo']], expected: ['foo']},
    {test: [['foo', 'bar']], expected: ['foo', 'bar']},
    {test: [['foo'], ['bar']], expected: ['foo', 'bar']}
];

describe('Unit\\pkg\\merge', function () {
    forEach(cases, (c, i) => {
        it('should pass case ' + i, function () {
            expect(merge(c.test)).toEqual(c.expected);
        });
    });
});
