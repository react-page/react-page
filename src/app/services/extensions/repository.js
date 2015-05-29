var Repository,
    instance;

Repository = function (url) {
    this.url = url;
};

Repository.prototype.getAll = function () {
    if (this.has(name)) {
        throw 'App identifier ' + name + ' already exists, please choose a unique name.';
    }
};

Repository.prototype.find = function (name) {
    if (!this.has(name)) {
        throw 'App identifier ' + name + ' does not exist.';
    }
};

Repository.prototype.has = function (name) {
    return this.apps[name] !== undefined;
};

Repository.prototype.addRemoteRepository = function (repository) {

};

module.exports = function (url) {
    if (!instance) {
        instance = new Repository(url);
    }
    return instance;
};
