import React from 'react';
import Plugin from 'app/service/plugin/Plugin';
import SectionModel from 'app/entity/Section';

class Section extends React.Component {
    render() {
        return (
            /*jshint ignore:start */
            <div style={{textAlign: 'center'}}>
                {this.props.data.text}
            </div>
            /*jshint ignore:end */
        );
    }
}

export default class Default extends Plugin {
    constructor() {
        super({
            name: 'math',
            version: '0.0.1',
            section: Section,
            create: function () {
                return new SectionModel(
                    this.name,
                    this.version,
                    this.args,
                    {
                        embed: '$3+1$'
                    }
                );
            },
            parse: function (section) {
                return {
                    text: section.textContent
                };
            }
        });
    }
}
