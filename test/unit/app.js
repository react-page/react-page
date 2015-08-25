var Editor = require("app/app"),
    React = require("react"),
    NoEditablesFound = require('app/exception/NoEditablesFound');

describe('Unit Services', function () {
    describe('Editor', function () {
        it('should be instantiable', function () {
            new Editor('body');
        });
    });
});
