import compare from 'app/pkg/compare';
import forEach from 'lodash/collection/forEach';

const cases = [
    {
        a: {foo: 1, bar: 2},
        b: {foo: 1, bar: 2, baz: 5},
        comp: ['foo', 'bar'],
        expected: true
    },
    {
        a: {foo: 1, baz: 5},
        b: {foo: 1, bar: 2, baz: 5},
        comp: ['foo', 'baz'],
        expected: true
    },
    {
        a: {foo: 1, bar: 2},
        b: {foo: 1, bar: 2, baz: 5},
        comp: ['foo', 'baz'],
        expected: false
    },
    {
        a: {foo: 1, baz: 2},
        b: {foo: 1, bar: 2, baz: 5},
        comp: ['foo', 'baz'],
        expected: false
    }
];

describe('Unit::pkg::compare', function () {
            forEach(cases, (c, i) => {
                it('should pass case ' + i, function () {
                    expect(compare(c.a, c.b, c.comp)).toBe(c.expected);
                });
    });
});
