'use strict';

var Registry,
    _ = require('underscore');

Registry = function (extensions) {
    this.extensions = {};
    if (extensions !== undefined) {
        this.registerAll(extensions);
    }
};

Registry.prototype.registerAll = function (extensions) {
    var self = this;
    _.each(extensions, function (extension, name) {
        self.register(name, extension);
    });
};

// register adds an extension instance to the registry.
Registry.prototype.register = function (name, extension) {
    if (this.has(name)) {
        throw 'Extension identifier ' + name + ' already exists, please choose a unique name.';
    }
    this.extensions[name] = extension;
};

// has returns true, if an extension id is known to the registry.
Registry.prototype.has = function (name) {
    return this.extensions[name] !== undefined;
};

Registry.prototype.get = function (name) {
    if (!this.has(name)) {
        throw 'Extension ' + name + ' does not exist.';
    }
    return this.extensions[name];
};

module.exports = Registry;
