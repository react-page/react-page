import React from 'react';
import Plugin from 'app/service/plugin/Plugin';
import Section from './Section';
import Toolbar from './Toolbar';

// TODO Dirtiest hack of my life
// Upstream issue: https://github.com/jakiestfu/Medium.js/issues/163
(function () {
    'use strict';
    /* global window, require */
    window.rangy = require('rangy');
    window.Undo = require('undo.js');
    require('rangy/lib/rangy-classapplier.js');
})();

export default class MediumJS extends Plugin {
    constructor() {
        super({
            name: 'mediumjs',
            version: '0.0.1',
            section: Section,
            toolbar: Toolbar
        });
    }
}
