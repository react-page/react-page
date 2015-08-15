import React from 'react';
import Plugin from 'app/service/plugin/Plugin';

class Component extends React.Component{
    render () {
        return (
            /*jshint ignore:start */
            <div contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.model.data.innerHTML}} />
            /*jshint ignore:end */
        );
    }
}

export default class Default extends Plugin {
    constructor() {
        super({
            name: 'default',
            version: '0.0.1',
            plugin: Component,
            tiles: function () {
                return {
                    text: {
                        tileHTML: '<span class="fa fa-align-left"></span>'
                    }
                };
            }
        });
    }
}
