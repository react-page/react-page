'use strict';

var React = require('react'),
    _ = require('underscore'),
    Editable = require('app/components/editable'),
    Toolbar = require('app/components/toolbar'),
    PluginManager = require('app/service/plugin/PluginManager'),
    NoEditablesFound = require('app/exception/NoEditablesFound'),
    Extractor = require('app/service/extraction/Extractor'),
    DOMImport = require('app/service/extraction/strategy/DOMImport'),
    interact = require('interact.js'),
    Reflux = require('Reflux'),
    Editor;

interact.dynamicDrop(true);

Editor = function (elements, config) {
    var self = this,
        defaultConfig = {
            clientID: ''
        };
    this.plugins = new PluginManager();
    this.extractor = new Extractor([new DOMImport(this.plugins)]);
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
    if (elements instanceof Object && elements.length !== undefined) {
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
    var model = this.extractor.extract(element);
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

