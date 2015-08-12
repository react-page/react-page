var Section = require('app/entity/Section'),
    PluginManager = function () {
        this.plugins = {
            fallback: {
                extract: function (a, b, data) {
                    return {
                        innerHTML: data.innerHTML
                    };
                },
                create: function (plugin, version, options) {
                    return new Section(plugin, version, {innerHTML: '<p>Insert text here</p>'});
                },
                Component: require('app/components/extensions/contenteditable')
            },
            contenteditable: {
                extract: function (a, b, data) {
                    return {
                        innerHTML: data.innerHTML
                    };
                },
                create: function (plugin, version, options) {
                    return new Section(plugin, version, {innerHTML: '<p>Insert text here</p>'});
                },
                Component: require('app/components/extensions/contenteditable')
            },
            mediumjs: {
                extract: function (a, b, data) {
                    return {
                        innerHTML: data.innerHTML
                    };
                },
                create: function (plugin, version, options) {
                    return new Section(plugin, version, {innerHTML: '<p>Insert text here</p>'});
                },
                Component: require('app/components/extensions/mediumjs')
            }
        }
    };

PluginManager.prototype.get = function (plugin, version) {
    return this.plugins[plugin];
};

PluginManager.prototype.has = function (plugin, version) {
    return this.plugins[plugin] !== undefined;
};

module.exports = PluginManager;
