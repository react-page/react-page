'use strict';

var React = require('react'),
    _ = require('underscore'),
    Editable = require('./components/editable'),
    Toolbar = require('./components/toolbar'),
    ExtensionRegistry = require('./service/extension/registry'),
    NoEditablesFound = require('./exception/NoEditablesFound'),
    Editor;

Editor = function (elements, config) {
    var defaultConfig = {
        clientID: '',
        extensions: {
            contenteditable: require('./components/extensions/contenteditable'),
            fallback: require('./components/extensions/fallback'),
            aloha: require('./components/extensions/aloha'),
            mediumjs: require('./components/extensions/mediumjs')
        }
    };
    this.config = _.extend(config || {}, defaultConfig);
    this.extensions = new ExtensionRegistry(this.config.extensions);
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
        <Toolbar />,
        /*jshint ignore:end */
        this.toolbar
    );
};

Editor.prototype.startEditable = function (element) {
    React.render(
        /*jshint ignore:start */
        <Editable extensions={ this.extensions } editor={ this } data={ element.dataset } children={ element.children }/>,
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
