import React from 'react';
import Plugin from 'app/service/plugin/Plugin';

class Section extends React.Component {
    render() {
        return (
            /*jshint ignore:start */
            <div contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.data.innerHTML}}/>
            /*jshint ignore:end */
        );
    }
}

export default class Default extends Plugin {
    constructor() {
        super({
            name: 'default',
            version: '0.0.1',
            section: Section,
            toolbar: null
        });
    }
}
