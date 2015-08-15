'use strict';

var React = require('react'),
    _ = require('underscore'),
    Editable = require('app/components/Editable'),
    Toolbar = require('app/components/Toolbar'),
    PluginManager = require('app/service/plugin/PluginManager'),
    NoEditablesFound = require('app/exception/NoEditablesFound'),
    Parser = require('app/service/parser/Parser'),
    DomParser = require('app/service/parser/strategy/DOMParser'),
    interact = require('interact.js'),
    Reflux = require('reflux'),
    DefaultPluginManagerFactory = require('app/factory/DefaultPluginManagerFactory'),
    Editor;

interact.dynamicDrop(true);

Editor = function (elements, config) {
    var self = this, defaultConfig = {};

    this.plugins = DefaultPluginManagerFactory.create();

    this.Parser = new Parser([new DomParser(this.plugins)]);
    this.config = _.extend(config || {}, defaultConfig);
    this.actions = {section: Reflux.createActions(['drag'])};
    this.stores = {
        drag: Reflux.createStore({
            init: function () {
                // Register statusUpdate action
                this.listenTo(self.actions.section.drag, this.drag);
            },
            drag: function (plugin, version, options) {
                this.trigger(plugin, version, options);
            }
        })
    };
    this.render(elements);
};

Editor.prototype.render = function (elements) {
    var length = 0;
    if (elements instanceof Object && elements.length) {
        length = elements.length;
    } else if (elements instanceof Array) {
        length = elements.length;
    }

    if (length > 0) {
        _.each(elements, this.startEditable.bind(this));
    } else if (elements instanceof HTMLElement) {
        this.startEditable(elements);
    } else {
        throw new NoEditablesFound();
    }

    this.toolbar = document.createElement('div');
    document.body.appendChild(this.toolbar);
    React.render(
        /*jshint ignore:start */
        <Toolbar editor={ this }/>,
        /*jshint ignore:end */
        this.toolbar
    );
};

Editor.prototype.startEditable = function (element) {
    var model = this.Parser.parse(element);
    React.render(
        /*jshint ignore:start */
        <Editable editor={ this } data={ element.dataset } model={ model }/>,
        /*jshint ignore:end */
        element
    );
};

if (window !== undefined) {
    window.ory = {
        Editor: Editor
    };
}

module.exports = Editor;
