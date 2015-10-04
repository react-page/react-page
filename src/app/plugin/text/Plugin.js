import AbstractPlugin from 'app/service/plugin/Plugin';
import Sections from './Component';
import React from 'react';

export default class TextPlugin extends AbstractPlugin {
    constructor() {
        super({name: 'text', version: 0});
    }

    render(sections) {
        /*jshint ignore:start */
        return <Sections sections={sections}></Sections>;
        /*jshint ignore:end */
    }
}
