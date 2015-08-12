var React = require('react'),
    DOMImport = require('app/service/extraction/strategy/DOMImport'),
    ExtractionException = require('app/exception/ExtractionException'),
    _ = require('underscore'),
    Editable = require('app/entity/Editable'),
    Section = require('app/entity/Section'),
    broken = [],
    working = [
        {
            html: '<div class="editable" data-id="1"><div data-section="fallback">Content</div></div>',
            expected: new Editable('1', '', [
                new Section('fallback', null, '<div data-section="fallback">Content</div>')
            ])
        },
        {
            html: '<div class="editable" data-id="15" data-field="title">' +
            '<div data-section="foobar">Title</div>' +
            '<div data-section="foobar" data-version="1.0">Content</div>' +
            '</div>',
            expected: new Editable('15', 'title', [
                new Section('foobar', null, '<div data-section="foobar">Title</div>'),
                new Section('foobar', "1.0", '<div data-section="foobar" data-version="1.0">Content</div>')
            ])
        },
        {
            html: '<div class="editable" data-id="1"><span>foobar</span></div>',
            expected: new Editable('1', '', [
                new Section('fallback', null, '<div data-section="fallback"><span>foobar</span></div>')
            ])
        },
        {
            html: '<div class="editable" data-id="1">foobar</div>',
            expected: new Editable('1', '', [
                new Section('fallback', null, '<div data-section="fallback">foobar</div>')
            ])
        }
    ],
    PluginManager;

PluginManager = function () {};
PluginManager.prototype.get = function () {
    return {
        extract: function (a, b, data) {
            return data.outerHTML;
        }
    }
};

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
                var pm = new PluginManager(),
                    domImport = new DOMImport(pm);
                _.each(working, function (v) {
                    var element = createDummyHTMLElement(v.html);
                    expect(domImport.extract(element)).toEqual(v.expected);
                });
            });
            it('should properly reject data it does not understand', function () {
                var domImport = new DOMImport();
                _.each(broken, function (v) {
                    try {
                        var element = createDummyHTMLElement(v);
                        domImport.extract(element);
                        expect(false).toBe(true);
                    } catch (e) {
                        expect(e instanceof ExtractionException).toBe(true);
                    }
                });
            });
        });
    });
});
