'use strict';

var InvalidArgumentException = function(message) {
    this.name = 'InvalidArgumentException';
    this.message = message || 'Invalid argument given';
    this.stack = (new Error()).stack;
};

InvalidArgumentException.prototype = new Error;
module.exports = InvalidArgumentException;