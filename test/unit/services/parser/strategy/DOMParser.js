import React from 'react';
import DOMParser from 'app/service/parser/strategy/DOMParser';
import ParserException from 'app/exception/ParserException';
import _ from 'lodash';
import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Plugin from 'app/service/plugin/Plugin';

const broken = [];
const cases = [
    // Automatically wrap unknown content in paragraphs
    {
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <span>pfa</span>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable('1', [
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('default', null, {tag: 'p'}, '<p>pfa</p>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>')
        ], '')
    },
    // Automatically wrap unknown content in paragraphs, remove unwanted tags and attributes
    {
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <span style="background: blue;"><iframe></iframe><strong  width="100" style="background: green;">strong</strong></span>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable('1', [
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('default', null, {tag: 'p'}, '<p><strong>strong</strong></p>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>')
        ], '')
    },
    // Detect images and split the sections automatically
    {
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <div>abc<img src="foobar.png">def</div>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable('1', [
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('default', null, {tag: 'p'}, '<p>abc</p>'),
            new Section('figure', null, null, '<figure><img src="foobar.png"></figure>'),
            new Section('default', null, {tag: 'p'}, '<p>def</p>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>')
        ], '')
    },
    // An editable with paragraphs only
    {
        html: '' +
        '<div class="editable">' +
        '   <p>p1</p>' +
        '   <p>p2</p>' +
        '</div>',
        expected: new Editable('1', [
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>')
        ], '')
    },
    // An editable with sections only
    {
        html: '' +
        '<div class="editable" data-field="title">' +
        '   <section data-extension="foobar">Title</section>' +
        '   <section data-extension="foobar" data-version="1.0">Content</section>' +
        '</div>',
        expected: new Editable('2', [
            new Section('foobar', null, null, '<div data-extension="foobar">Title</div>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>')
        ], 'title')
    },
    // An editable paragraphs and other text nodes
    {
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable('3', [
            new Section('default', null, {tag: 'h1'}, '<h1>h1</h1>'),
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('default', null, {tag: 'h3'}, '<h3>h3</h3>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>'),
            new Section('default', null, {tag: 'blockquote'}, '<blockquote>block</blockquote>')
        ], '')
    },
    // An editable paragraphs, other text nodes and extensions
    {
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <div data-extension="foobar" data-version="1.0">Content</div>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable('3', [
            new Section('default', null, {tag: 'h1'}, '<h1>h1</h1>'),
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>'),
            new Section('default', null, {tag: 'h3'}, '<h3>h3</h3>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>'),
            new Section('default', null, {tag: 'blockquote'}, '<blockquote>block</blockquote>')
        ], '')
    },
    // An editable paragraphs, other text nodes and extensions
    {
        html: '' +
        '<div class="editable">' +
        '   <h1>h1</h1>' +
        '   <p>p1</p>' +
        '   <div data-extension="foobar" data-version="1.0">Content</div>' +
        '   <h3>h3</h3>' +
        '   <p>p2</p>' +
        '   <blockquote>block</blockquote>' +
        '</div>',
        expected: new Editable('3', [
            new Section('default', null, {tag: 'h1'}, '<h1>h1</h1>'),
            new Section('default', null, {tag: 'p'}, '<p>p1</p>'),
            new Section('foobar', '1.0', null, '<div data-extension="foobar" data-version="1.0">Content</div>'),
            new Section('default', null, {tag: 'h3'}, '<h3>h3</h3>'),
            new Section('default', null, {tag: 'p'}, '<p>p2</p>'),
            new Section('default', null, {tag: 'blockquote'}, '<blockquote>block</blockquote>')
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

            var dp = new DOMParser(pm);
            _.forEach(cases, function (d) {
                var element = createDummyHTMLElement(d.html), p = dp.parse(element);
                it('should properly parse: ' + d.html, function () {
                    // Clean up, because IDs are generated randomly.
                    // TODO Fix hack
                    d.expected.sections = _.map(d.expected.sections, (v, k) => {
                        v.id = p.sections[k].id;
                        return v;
                    });
                    expect(p).toEqual(d.expected);
                });
            });

            it('should properly reject data it does not understand', function () {
                var dp = new DOMParser(pm);
                _.forEach(broken, v => expect(dp.parse(createDummyHTMLElement(v))).toThrowError(ParserException));
            });
        });
    });
});
