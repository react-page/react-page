import subset from 'app/pkg/subset';
import forEach from 'lodash/collection/forEach';

const cases = [
    {
        a: {foo: 1, bar: 2, baz: 5},
        comp: ['foo', 'bar'],
        expected: {foo: 1, bar: 2}
    },
    {
        a: {foo: 1, bar: 2, baz: 5},
        comp: ['baz', 'bar'],
        expected: {baz: 5, bar: 2}
    },
    {
        a: {foo: 1, baz: 5},
        comp: ['foo'],
        expected: {foo: 1}
    }
];

describe('Unit\\pkg\\subset', function () {
    forEach(cases, (c, i) => {
        it('should pass case ' + i, function () {
            expect(subset(c.a, c.comp)).toEqual(c.expected);
        });
    });
});
