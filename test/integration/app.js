var Editor = require('app/app'),
    React = require('react'),
    NoEditablesFound = require('app/exception/NoEditablesFound');

function createDummyMarkup() {
    var div = document.createElement('div');
    div.className = 'push';
    div.insertAdjacentHTML('afterbegin', '<div class="editable" data-id="1">' +
        '   <div data-plugin="fallback">Content</div>' +
        '</div>');
    document.body.appendChild(div);
    return div;
}

describe('Integration:', function () {
    describe('(new Editor())', function () {
        it('should not throw an exception when passing a dom element', function () {
            var div = createDummyMarkup();
            new Editor(div);
        });
    });
});
