'use strict';

import React from 'react';
import _ from 'underscore';
import Editable from 'app/components/Editable';
import Toolbar from 'app/components/Toolbar';
import PluginManager from 'app/service/plugin/PluginManager';
import NoEditablesFound from 'app/exception/NoEditablesFound';
import Parser from 'app/service/parser/Parser';
import DomParser from 'app/service/parser/strategy/DOMParser';
import interact from 'interact.js';
import Reflux from 'reflux';
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
    constructor(elements, options) {
        this.plugins = DefaultPluginManagerFactory.create();
        this.parser = new Parser([new DomParser(this.plugins)]);
        this.render(elements);
    }

    render(elements) {
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
    }

    startEditable(element) {
        var model = this.parser.parse(element);
        React.render(
            /*jshint ignore:start */
            <Editable editor={ this } model={ model }/>,
            /*jshint ignore:end */
            element
        );
    }
}

// This is useful if no AMD system is used.
if (window !== undefined) {
    window.ory = {Editor: Editor};
}

export default Editor;
