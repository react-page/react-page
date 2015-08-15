import Plugin from 'app/service/plugin/Plugin';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import Repository from 'app/service/plugin/Repository';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import React from 'react';

describe('Unit', function () {
    describe('Repository', function () {
        var r, p = new Plugin({
            name: 'foo',
            version: '0.1',
            compatibility: ['0.0.1'],
            plugin: React.createClass({
                render: function () {
                    return false;
                }
            })
        });

        it('should properly instantiate', function () {
            r = new Repository([p]);
            expect(r).toBeDefined();
        });

        it('should find a registered plugin', function () {
            expect(r.has('foo', '0.1')).toBe(true);
            expect(r.has('foo', '0.0.1')).toBe(true);
            expect(r.get('foo', '0.1')).toEqual(p);
            expect(r.get('foo', '0.0.1')).toEqual(p);
        });

        it('should throw an exception when being passed invalid arguments', function () {
            expect(() => new Repository([{}])).toThrowError(InvalidArgumentException);
        });

        it('should be make good compatibility assumptions', function () {
            expect(Repository.isCompatible('0.1', ['0.0.1', '0.1'])).toBe(true);
            expect(Repository.isCompatible('0.0.1', ['0.0.1', '0.1'])).toBe(true);
            expect(Repository.isCompatible('0.3', ['0.0.1', '0.1'])).toBe(false);
        });
    });
});
