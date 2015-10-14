import Plugin from 'app/service/plugin/Plugin';
import forEach from 'lodash/collection/forEach';

const cases = [
    {
        input: {version: 0, name: 'foo'},
        expected: {version: 0, name: 'foo'}
    },
    {
        input: {version: 1, name: 'foo'},
        expected: {version: 1, name: 'foo'}
    },
    {
        input: {name: 'foo'},
        expected: {version: 0, name: 'foo'}
    },
    {
        input: {version: '1', name: 'foo'},
        expected: {version: 1, name: 'foo'}
    }
];

describe('Unit\\Service\\Plugin', function () {
    forEach(cases, (c, k) => {
        it('should pass case ' + k, function () {
            var p = new Plugin(c.input);
            expect(p.version).toBe(c.expected.version);
            expect(p.name).toBe(c.expected.name);
        });
    });
});
