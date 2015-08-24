import Section from 'app/entity/Section';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import {Component} from 'react';
import React from 'react';
import Actions from 'app/Actions';

class Toolbar extends React.Component {
    render() {
        return (
            /*jshint ignore:start */
            <div className="text-center">
                Plugin does not provide a toolbar, sorry :(
            </div>
            /*jshint ignore:end */
        );
    }
}

export default class Plugin {
    constructor(options) {
        var reg = /([0-9]\.)+[0-9]/i;

        if (options.name === undefined || options.length === 0) {
            throw new InvalidArgumentException('options.name', 'String (not empty)', options.name);
        }

        if (!options.version.match(reg)) {
            throw new InvalidArgumentException('options.version', 'String (should match `[X.]+X`)', options.version);
        }

        if (typeof options.section !== 'function') {
            throw new InvalidArgumentException('options.section', 'function', options.section);
        }

        if (typeof options.toolbar !== 'function') {
            options.toolbar = Toolbar;
        }

        // This is the plugin function (should be a React Component)
        this.Section = options.section;
        this.Toolbar = options.toolbar;

        // The plugin's settings
        this.name = options.name || '';
        this.version = options.version || '';
        this.compatibility = options.compatibility || [];
        this.args = options.args || {};

        // Some callbacks for easy extension of this class
        this.toolbarcb = options.toolbar;
        this.parsecb = options.parse;
        this.createcb = options.create;
    }

    focus(context) {
        Actions.editable.section.focus(this, context);
    }

    blur(context) {
        Actions.editable.section.blur(this, context);
    }

    parse(element, options) {
        if (typeof this.parsecb === 'function') {
            return this.parsecb(element, options);
        }
        return {innerHTML: element.innerHTML};
    }

    createSection() {
        if (typeof this.createcb === 'function') {
            return this.createcb();
        }
        return new Section(this.name, this.version, this.args, {innerHTML: '<p>Click in this area to write text</p>'});
    }

    toolbar() {
        if (typeof this.toolbarcb === 'function') {
            return this.toolbarcb();
        }
        return {};
    }

    getReactComponent() {
        throw 'You need to implement getReactComponent!';
    }
}
