import Editor from 'app/app';
import React from 'react';
import NoEditablesFound from 'app/exception/NoEditablesFound';
import _ from 'lodash';

const tests = [
    '<div class="editable" data-id="1"><div data-section="default">Content</div></div>',
    '<div class="editable" data-id="1"><div data-section="mediumjs">Content</div></div>',
    '<div class="editable" data-id="1"><div data-section="mediumjs">1</div><div data-section="mediumjs">2</div></div>',
    '<div class="editable" data-id="1">Content</div>'
];

function createDummyMarkup(html) {
    var div = document.createElement('div');
    div.className = 'push';
    div.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(div);
}

describe('Integration:', function () {
    describe('Editor', function () {
        it('should not throw an exception when passing a dom element', function () {
            _.forEach(tests, html => {
                createDummyMarkup(html);
                expect(new Editor('.editable')).toBeDefined()
            });
        });
    });
});
