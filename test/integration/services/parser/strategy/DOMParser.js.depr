import React from 'react';
import DOMParser from 'app/service/parser/strategy/DOMParser';
import _ from 'lodash';
import Editable from 'app/entity/Editable';
import Section from 'app/entity/Section';
import PluginManager from 'app/service/plugin/PluginManager';
import Repository from 'app/service/plugin/Repository';
import Plugin from 'app/service/plugin/Plugin';

const cases = [
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
    }
];

function createDummyHTMLElement(html) {
    var div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div);
    return div.children[0];
}

describe('Integration', function () {
    describe('Parser', function () {
        describe('DOMParser', function () {
            it('should be instantiable', function () {
                new DOMParser();
            });

            var repository = new Repository([]);
            var pm = new PluginManager([repository]);
            var dp = new DOMParser(pm);

            _.forEach(cases, function (d) {
                xit('should properly parse: ' + d.html, function () {
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
        });
    });
});
