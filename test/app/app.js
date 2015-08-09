var Editor = require("../../src/app/app"),
    React = require("react"),
    NoEditablesFound = require('./exception/noEditablesFound'),;

function createDummyMarkup() {
    var div = document.createElement('div');
    div.innerHTML = '<div class="editable" data-id="1">' +
        '   <div data-plugin="fallback">Content</div>' +
        '</div>';
    document.body.appendChild(div);
    return div;
}

describe('new Editor()', function() {
    it('should throw an exception when passing an empty array', function() {
        expect(new Editor([])).toThrow(new NoEditablesFound);
    });
    it('should throw an exception when passing an empty iterable', function() {
        expect(new Editor({length: 0})).toThrow(new NoEditablesFound);
    });
    it('should not throw an exception when passing a dom element', function() {
        var div = document.createElement('div');
        expect(true).toBe(true);
    });
});
