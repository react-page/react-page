import Plugin from 'app/service/plugin/Plugin';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';
import Repository from 'app/service/plugin/Repository';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import React from 'react';
import u from 'underscore';

const cases = {
    working: [
        {
            version: '1.1', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {
            version: '1.1.3', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        }
    ],
    exception: [
        {},
        {
            version: '0.1', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {
            version: '1', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {
            version: '1.a', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {
            version: 'a', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {
            version: 'a.1', name: 'foo', section: React.createClass({
            render: function () {
                return false;
            }
        })
        },
        {version: 'a.1', name: 'foo', section: {}},
        {version: '0.1', name: 'foo'}
    ]
};

describe('Unit', function () {
    describe('Plugin', function () {
        it('should properly instantiate', function () {
            u.each(cases.working, p => expect(new Plugin(p)).toBeDefined());
        });
        it('should throw an exception when being passed invalid arguments', function () {
            u.each(cases.exception, p => expect(() => new Plugin(p)).toThrowError(InvalidArgumentException));
        });
    });
});
