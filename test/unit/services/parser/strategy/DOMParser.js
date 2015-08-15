import React from 'react';
import DOMParser from 'app/service/parser/strategy/DOMParser';
import ParserException from 'app/exception/ParserException';
import u from 'underscore';
import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Plugin from 'app/service/plugin/Plugin';

const broken = [];
const working = [
    {
        html: '<div class="editable" data-id="1"><div data-section="default">Content</div></div>',
        expected: new Editable('1', [
            new Section('default', null, null, '<div data-section="default">Content</div>')
        ], '')
    },
    {
        html: '<div class="editable" data-id="2" data-field="title">' +
        '<div data-section="foobar">Title</div>' +
        '<div data-section="foobar" data-version="1.0">Content</div>' +
        '</div>',
        expected: new Editable('2', [
            new Section('foobar', null, null, '<div data-section="foobar">Title</div>'),
            new Section('foobar', '1.0', null, '<div data-section="foobar" data-version="1.0">Content</div>')
        ], 'title')
    },
    {
        html: '<div class="editable" data-id="3"><span>foobar</span></div>',
        expected: new Editable('3', [
            new Section('default', null, null, '<div data-section="default"><span>foobar</span></div>')
        ], '')
    },
    {
        html: '<div class="editable" data-id="4">foobar</div>',
        expected: new Editable('4', [
            new Section('default', null, null, '<div data-section="default">foobar</div>')
        ], '')
    }
];

class MockPlugin extends Plugin {
    parse(element, options) {
        return element.outerHTML;
    }
}

function createDummyHTMLElement(html) {
    var div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div);
    return div.children[0];
}

describe('Unit', function () {
    describe('Parser', function () {
        describe('DOMParser', function () {
            it('should be instantiable', function () {
                new DOMParser();
            });

            var repository = new Repository([
                new MockPlugin({
                        version: '0.0.1',
                        name: 'default',
                        section: React.createClass({
                            render: function () {
                                return false;
                            }
                        })
                    }),
                    new MockPlugin({
                        version: '1.0',
                        name: 'foobar',
                        section: React.createClass({
                            render: function () {
                                return false;
                            }
                        })
                    })
            ]);
            var pm = new PluginManager([repository]);

            it('should properly parse data', function () {
                var dp = new DOMParser(pm);
                u.each(working, function (v) {
                    var element = createDummyHTMLElement(v.html),
                        p = dp.parse(element);

                    // Clean up, because IDs are generated randomly.
                    // TODO Fix hack
                    v.expected.sections = u.map(v.expected.sections, (v, k) => {
                        v.id = p.sections[k].id;
                        return v;
                    });

                    expect(p).toEqual(v.expected);
                });
            });

            it('should properly reject data it does not understand', function () {
                var dp = new DOMParser(pm);
                u.each(broken, v => expect(dp.parse(createDummyHTMLElement(v))).toThrowError(ParserException));
            });
        });
    });
});
