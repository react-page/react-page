import Plugin from 'app/service/plugin/Plugin';
import PluginManager from 'app/service/plugin/PluginManager';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import Repository from 'app/service/plugin/Repository';
import React from 'react';

describe('Unit', function () {
    describe('PluginManager', function () {
        var plugin = new Plugin({
                name: 'foo',
                version: 2
            }),
            repository = new Repository([plugin]), pm;

        it('should properly instantiate', function () {
            pm = new PluginManager([repository, new Repository()]);
            expect(pm).toBeDefined();
        });

        it('should have plugin foo/1', function () {
            expect(pm.has('foo', 1)).toBe(true);
        });

        it('should have plugin foo/"1"', function () {
            expect(pm.has('foo', '1')).toBe(true);
        });

        it('should have plugin foo/1', function () {
            expect(pm.has('foo', 1)).toBe(true);
        });

        it('should return instance of plugin foo/0', function () {
            expect(pm.get('foo', 0).name).toBe('foo');
        });

        it('should throw an exception when getting bar/0.1', function () {
            expect(() => pm.get('bar', '0.1')).toThrowError(PluginNotFoundException);
        });

        it('should not have plugin foo/3', function () {
            expect(() => pm.get('foo', 3)).toThrowError(PluginNotFoundException);
        });
    });
});
