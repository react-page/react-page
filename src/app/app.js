'use strict';

var React = require('react'),
    _ = require('underscore'),
    Editable = require('./components/editable'),
    Toolbar = require('./components/toolbar'),
    ExtensionRegistry = require('./services/extensions/registry'),
    Editor;

Editor = function (config) {
    var defaultConfig = {
        selectors: {
            editableArea: '.editable-area',
            toolbar: '#toolbar'
        },
        extensions: {
            contenteditable: require('./components/extensions/contenteditable'),
            fallback: require('./components/extensions/fallback'),
            aloha: require('./components/extensions/aloha')
        }
    };
    this.config = _.extend(config || {}, defaultConfig);
    this.extensions = new ExtensionRegistry(this.config.extensions);
    this.render();
};

Editor.prototype.render = function () {
    this.startToolbar();
    this.startEditableAreas();
};

Editor.prototype.startToolbar = function () {
    var toolbar = document.querySelectorAll(this.config.selectors.toolbar);
    if (toolbar.length !== 1) {
        console.warn('You should provide exactly one toolbar.');
    }

    React.render(
        /*jshint ignore:start */
        <Toolbar />,
        /*jshint ignore:end */
        toolbar[0]
    );
};

Editor.prototype.startEditableAreas = function () {
    var config = this.config.selectors,
        editableAreas = document.querySelectorAll(config.editableArea),
        self = this;

    if (editableAreas.length === 0) {
        console.warn('No editable areas found.');
    }

    _.each(editableAreas, function (e) {
        React.render(
            /*jshint ignore:start */
            <Editable extensions={ self.extensions } editor={ self } data={ e.dataset } children={ e.children }/>,
            /*jshint ignore:end */
            e
        );
    });
};

module.exports = Editor;

if (window !== undefined) {
    window.ory = {
        Editor: Editor
    };
}
