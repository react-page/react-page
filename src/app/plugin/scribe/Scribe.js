import React from 'react';
import Plugin from 'app/service/plugin/Plugin';
import Section from './Section';
import Toolbar from './Toolbar';

export default class Scribe extends Plugin {
    constructor() {
        super({
            name: 'default',
            version: '0.0.1',
            section: Section,
            toolbar: Toolbar,
            join: true
        });
    }
}
