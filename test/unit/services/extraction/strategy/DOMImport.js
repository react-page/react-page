var React = require('react'),
    DOMImport = require('../../../../../src/app/service/extraction/strategy/DOMImport'),
    ExtractionException = require('../../../../../src/app/exception/ExtractionException'),
    _ = require('underscore'),
    Editable = require('../../../../../src/app/entity/Editable'),
    Field = require('../../../../../src/app/entity/Field'),
    Section = require('../../../../../src/app/entity/Section'),
    broken = [
        // Should not work because of duplicate title field
        '<div class="editable" data-id="1">' +
        '<div data-field="title"><div data-plugin="fallback">Title</div></div>' +
        '<div data-field="title"><div data-plugin="fallback">Title</div></div>' +
        '</div>',
        // No data-id
        '<div class="editable"></div>'
    ],
    working = [
        {
            html: '<div class="editable" data-id="1"><div data-plugin="fallback">Content</div></div>',
            expected: new Editable(1, [
                new Field('default', [
                    new Section('fallback')
                ])
            ])
        },
        {
            html: '<div class="editable" data-id="1">' +
            '<div data-field="title"><div data-plugin="fallback">Title</div></div>' +
            '<div data-field="content"><div data-plugin="fallback">Content</div></div>' +
            '</div>',
            expected: {}
        },
        {
            html: '<div class="editable" data-id="1"><span>foobar</span></div>',
            expected: {}
        },
        {
            html: '<div class="editable" data-id="1">foobar</div>',
            expected: {}
        }
    ];

function createDummyHTMLElement(html) {
    var div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div);
    return div.children[0];
}

describe('Unit:', function () {
    describe('Extraction', function () {
        describe('DOMImport', function () {
            it('should be instantiable', function () {
                new DOMImport();
            });
            it('should properly extract data', function () {
                var domImport = new DOMImport();
                _.each(working, function(v) {
                    var element = createDummyHTMLElement(v.html);
                    expect(domImport.extract(element)).toEqual(v.expected);
                });
            });
            it('should properly reject data it does not understand', function () {
                var domImport = new DOMImport();
                _.each(broken, function(v) {
                    try {
                        var element = createDummyHTMLElement(v);
                        domImport.extract(element);
                        expect(false).toBe(true);
                    } catch (e) {
                        expect(e instanceof ExtractionException).toBe(true);
                    }
                });
            })
        });
    });
});