'use strict';

var ExtractionException = function(message) {
    this.name = 'ExtractionException';
    this.message = message || 'The extractor strategy was unable to properly extract the data';
    this.stack = (new Error()).stack;
};

ExtractionException.prototype = new Error;
module.exports = ExtractionException;