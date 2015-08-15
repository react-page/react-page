import Section from 'app/entity/Section';
import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import {Component} from 'react';

export default class Plugin {
    constructor(options) {
        var reg = /([0-9]\.)+[0-9]/i;
        if (options.name === undefined || options.length === 0) {
            throw new InvalidArgumentException('options.name', 'String (not empty)', options.name);
        }
        if (!options.version.match(reg)) {
            throw new InvalidArgumentException('options.version', 'String (should match `[X.]+X`)', options.version);
        }
        if (typeof options.plugin !== 'function') {
            throw new InvalidArgumentException('options.name', 'function', options.plugin);
        }

        this.name = options.name;
        this.version = options.version;
        this.compatibility = options.compatibility || [];
        this.plugin = options.plugin;
        this.toolbarcb = options.toolbar;
        this.parsecb = options.parse;
        this.createcb = options.create;
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
        return new Section(this.name, this.version, {innerHTML: '<p>Click in this area to write text</p>'});
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
