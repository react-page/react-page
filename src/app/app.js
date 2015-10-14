'use strict';
import React from 'react';
import async from 'async';
import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';
import Editable from 'app/components/Editable';
import PluginManager from 'app/service/plugin/PluginManager';
import Parser from 'app/service/parser/Parser';
import RemoteStrategy from 'app/service/parser/strategy/RemoteStrategy';
import DefaultPluginManagerFactory from 'app/factory/DefaultPluginManagerFactory';
import Store from 'app/stores/Partition';

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
        this.parser = new Parser([new RemoteStrategy()]);
        this.render(selector);
    }

    render(selector) {
        var elements = isString(selector) ? document.querySelectorAll(selector) : [selector];
        async.each(elements, (element) => {
            this.parser.parse(element).then((entity) => {
                let store = new Store(entity);
                /*jshint ignore:start */
                React.render(<Editable store={store} plugins={ this.plugins } sections={ entity.sections }/>, element);
                /*jshint ignore:end */
            });
        });
    }
}

// FIXME
if (window !== undefined) {
    window.ory = {Editor: Editor};
}

export default Editor;
