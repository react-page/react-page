import AbstractPlugin from 'app/service/plugin/Plugin';
import React from 'react';
import map from 'lodash/collection/map';
import Placeholder from './Component';

export default class PlaceholderPlugin extends AbstractPlugin {
    constructor() {
        super({
            name: 'placeholder',
            version: 0
        });
    }

    render(sections, store) {
        /*jshint ignore:start */
        return <div>{map(sections, () => <Placeholder />)}</div>;
        /*jshint ignore:end */
    }
}
