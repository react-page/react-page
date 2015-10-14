import React from 'react';
import DOMParser from 'app/service/parser/strategy/DOMParser';
import ParserException from 'app/exception/ParserException';
import _ from 'lodash';
import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Plugin from 'app/service/plugin/Plugin';

jasmine.pp = function (obj) {
    return JSON.stringify(obj, undefined, 2);
};

const broken = [];
const cases = [
    // Automatically wrap unknown content in paragraphs
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <span>pfa</span>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<p>p1</p>'),
            new Section('default', null, null, '<p>pfa</p>'),
            new Section('default', null, null, '<p>p2</p>')
        ], '')
    },
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <span>pfa</span>' +
        '   <p>p2</p>' +
        '</div>',
        joins: [true, false],
        expected: new Editable(null, [
            new Section('default', null, null, '<p>p1</p><p>pfa</p><p>p2</p>')
        ], '')
    },
    // Detect images and split the sections automatically
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <div>abc<img src="foobar.png">def</div>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<p>p1</p>'),
            new Section('default', null, null, '<p>abc</p>'),
            new Section('figure', null, null, '<figure><img src="foobar.png"></figure>'),
            new Section('default', null, null, '<p>def</p>'),
            new Section('default', null, null, '<p>p2</p>')
        ], '')
    },
    // An editable with paragraphs only
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<p>p1</p>'),
            new Section('default', null, null, '<p>p2</p>')
        ], '')
    },
    // An editable with sections only
    {
        skip: true,
        html: '' +
        '<div class="editable" data-field="title">' +
        '   <section data-extension="foobar">Title</section>' +
        '   <section data-extension="foobar" data-version="1.0">Content</section>' +
        '</div>',
        expected: new Editable(null, [
            new Section('foobar', null, null, '<section data-extension="foobar">Title</section>'),
            new Section('foobar', '1.0', null, '<section data-extension="foobar" data-version="1.0">Content</section>')
        ], 'title')
    },
    // An editable paragraphs and other text nodes
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<h1>h1</h1>'),
            new Section('default', null, null, '<p>p1</p>'),
            new Section('default', null, null, '<h3>h3</h3>'),
            new Section('default', null, null, '<p>p2</p>'),
            new Section('default', null, null, '<blockquote>block</blockquote>')
        ], '')
    },
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   foo' +
        '   <h1>h1</h1>' +
        '   bar' +
        '   <h1>h1</h1>' +
        '   baz <b>foo</b>bar' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<p>foo</p>'),
            new Section('default', null, null, '<h1>h1</h1>'),
            new Section('default', null, null, '<p>bar</p>'),
            new Section('default', null, null, '<h1>h1</h1>'),
            new Section('default', null, null, '<p>baz <b>foo</b>bar</p>')
        ], '')
    },
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   foo' +
        '   <p>foo <b>bar</b></p>' +
        '   bar' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<p>foo</p>'),
            new Section('default', null, null, '<p>foo <b>bar</b></p>'),
            new Section('default', null, null, '<p>bar</p>')
        ], '')
    },
    // An editable paragraphs, other text nodes and extensions
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <div data-extension="foobar" data-version="1.0">Content</div>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<h1>h1</h1>'),
            new Section('default', null, null, '<p>p1</p>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>'),
            new Section('default', null, null, '<h3>h3</h3>'),
            new Section('default', null, null, '<p>p2</p>'),
            new Section('default', null, null, '<blockquote>block</blockquote>')
        ], '')
    },
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <div data-extension="foobar" data-version="1.0">Content</div>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        joins: [true, false],
        expected: new Editable(null, [
            new Section('default', null, null, '<h1>h1</h1><p>p1</p>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>'),
            new Section('default', null, null, '<h3>h3</h3><p>p2</p><blockquote>block</blockquote>'),
        ], '')
    },
    // An editable paragraphs, other text nodes and extensions
    {
        skip: true,
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <div data-extension="foobar" data-version="1.0">Content</div>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable(null, [
            new Section('default', null, null, '<h1>h1</h1>'),
            new Section('default', null, null, '<p>p1</p>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>'),
            new Section('default', null, null, '<h3>h3</h3>'),
            new Section('default', null, null, '<p>p2</p>'),
            new Section('default', null, null, '<blockquote>block</blockquote>')
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

            var plugins = [
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
            ];
            var repository = new Repository(plugins);
            var pm = new PluginManager([repository]);

            var dp = new DOMParser(pm);
            _.forEach(cases, function (d, num) {
                var joins = d.joins || [false, false];
                _.forEach(joins, (join, k) => {
                    plugins[k].join = join;
                });

                var t = d.skip || false ? xit : it;
                t('should properly parse set ' + num + ': ' + d.html, function () {
                    var element = createDummyHTMLElement(d.html),
                        p = dp.parse(element);
                    // Clean up, because IDs are generated randomly.
                    // TODO Fix hack
                    d.expected.sections = _.map(d.expected.sections, (v, k) => {
                        v.id = p.sections[k].id;
                        return v;
                    });
                    expect(p).toEqual(d.expected);
                });
            });

            xit('should properly reject data it does not understand', function () {
                var dp = new DOMParser(pm);
                _.forEach(broken, v => expect(dp.parse(createDummyHTMLElement(v))).toThrowError(ParserException));
            });
        });
    });
});
