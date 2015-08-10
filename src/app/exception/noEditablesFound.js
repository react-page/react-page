'use strict';

var NoEditablesFound = function() {
    this.name = 'NoEditablesFound';
    this.message = 'No editables found';
    this.stack = (new Error()).stack;
};

NoEditablesFound.prototype = new Error;
module.exports = NoEditablesFound;
