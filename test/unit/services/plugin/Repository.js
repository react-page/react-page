import Plugin from 'app/service/plugin/Plugin';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import Repository from 'app/service/plugin/Repository';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import forEach from 'lodash/collection/forEach';

describe('Unit', function () {
    describe('Repository', function () {
        var r, p = new Plugin({
            name: 'foo',
            version: 1
        });

        it('should properly instantiate', function () {
            r = new Repository([p]);
            expect(r).toBeDefined();
        });

        it('should find a registered plugin', function () {
            expect(r.has('foo', 1)).toBe(true);
            expect(r.has('foo', '1')).toBe(true);
            expect(r.get('foo', 1)).toEqual(p);
            expect(r.get('foo', '1')).toEqual(p);
        });

        it('should throw an exception when being passed invalid arguments', function () {
            expect(() => new Repository([{}])).toThrowError(InvalidArgumentException);
        });

        var cases = [[1, 1, true], [0, 1, true], [2, 1, false]];
        forEach(cases, (c, k) => {
            it('should be make good compatibility assumptions and pass case ' + k, function () {
                expect(Repository.isCompatible(c[0], c[1])).toBe(c[2]);
            });
        });
    });
});
