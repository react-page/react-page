var Editor = require("app/app"),
    React = require("react"),
    NoEditablesFound = require('app/exception/NoEditablesFound');

describe('Unit:', function () {
    describe('(new Editor())', function () {
        it('should throw an exception when passing an empty array', function () {
            expect(function () {
                new Editor([]);
            }).toThrow(new NoEditablesFound);
        });
        it('should throw an exception when passing an empty iterable', function () {
            expect(function () {
                new Editor({length: 0});
            }).toThrow(new NoEditablesFound);
        });
    });
});
