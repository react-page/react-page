'use strict';
import React from 'react';
import forEach from 'lodash/collection/forEach';
import Editable from 'app/components/Editable';
import Toolbar from 'app/components/Toolbar';
import PluginManager from 'app/service/plugin/PluginManager';
import Parser from 'app/service/parser/Parser';
import DomParser from 'app/service/parser/strategy/DOMParser';
import interact from 'interact.js';
import DefaultPluginManagerFactory from 'app/factory/DefaultPluginManagerFactory';

// Enable interact's dynamic drop feature.
interact.dynamicDrop(true);

/**
 *
 * @example
 * // var Editor = window.ory.Editor;
 * // or
 * // var Editor = require //...
 * var editor = new Editor(document.querySelectAll('.editable-area'));
 */
class Editor {
    constructor(selector, options) {
        this.plugins = DefaultPluginManagerFactory.create();
        this.parser = new Parser([new DomParser(this.plugins)]);
        this.render(selector);
    }

    render(selector) {
        var elements = document.querySelectorAll(selector);
        forEach(elements, this.startEditable.bind(this));

        this.toolbar = document.createElement('div');
        document.body.appendChild(this.toolbar);
        /*jshint ignore:start */
        React.render(<Toolbar editor={ this }/>, this.toolbar);
        /*jshint ignore:end */
    }

    startEditable(element) {
        var model = this.parser.parse(element);
        /*jshint ignore:start */
        React.render(<Editable editor={ this } model={ model }/>, element);
        /*jshint ignore:end */
    }
}

// FIXME
if (window !== undefined) {
    window.ory = {
        Editor: Editor
    };
}

export default Editor;
