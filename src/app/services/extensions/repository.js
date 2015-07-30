'use strict';

var Repository,
    instance;

Repository = function (url) {
    this.url = url;
};

Repository.prototype.find = function (name) {
    if (!this.has(name)) {
        throw 'App identifier ' + name + ' does not exist.';
    }
};

Repository.prototype.has = function (name) {
    return this.apps[name] !== undefined;
};

module.exports = function (url) {
    if (!instance) {
        instance = new Repository(url);
    }
    return instance;
};
