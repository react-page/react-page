var Registry,
    instance;
    //_ = require('underscore'),
    //AppNotFound = require('errors/appNotFound'),
    //Repository = require('services/app/repository');

Registry = function () {
    this.extensions = {};
};

// register adds an app instance to the registry.
Registry.prototype.register = function (name, app) {
    if (this.has(name)) {
        throw 'Extension identifier ' + name + ' already exists, please choose a unique name.';
    }
    this.apps.name = app;
};

// has returns true, if an app id is known to the registry.
Registry.prototype.has = function (name) {
    return this.apps[name] !== undefined;
};

module.exports = function () {
    // There should only be one registry => singleton
    if (!instance) {
        instance = new Registry();
    }
    return instance;
};


// find searches for an app instance in the registry.
// If no app is found, the app registries are going to be checked.
/*Registry.prototype.find = function (name) {
    var p = new Promise(), self = this, checkRepository;

    if (this.has(name)) {
        p.resolve(this.apps.name);
        return;
    }

    checkRepository = function (r, k) {
        r.find(name).then(function (app) {
            self.add(name, app);
            p.resolve(app);
        }).reject(function () {
            if (k === self.repositories.length - 1) {
                p.reject(new AppNotFound());
            }
        });
    };
    _.each(this.repositories, checkRepository);
};*/


// registerRepository adds an app repository.
/*Registry.prototype.registerRepository = function (repository) {
    if (!repository instanceof Repository) {
        throw new Error('Requires an instance of `Repository`')
    }
    this.repositories.push(repository);
};*/
