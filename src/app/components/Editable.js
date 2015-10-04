'use strict';

import React from 'react';
import map from 'lodash/collection/map';
import Partitioner from 'app/service/partitioner/Partitioner';

var partitioner = new Partitioner();

export default class Editable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sections: partitioner.partition(props.sections)};
    }

    renderComponent(section, k) {
        var plugin = this.props.plugins.get(section.name || 'text', section.version);

        /*jshint ignore:start */
        return <div key={k}>{plugin.render(section)}</div>;
        /*jshint ignore:end */
    }

    render() {
        /*jshint ignore:start */
        return <div>{map(this.state.sections, (section, k) => this.renderComponent(section,k))}</div>;
        /*jshint ignore:end */
    }
}
