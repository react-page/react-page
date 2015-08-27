import React from 'react';
import Plugin from 'app/service/plugin/Plugin';
import SectionModel from 'app/entity/Section';
import map from 'lodash/collection/map';

class Section extends React.Component {
    render() {
        return (
            /*jshint ignore:start */
            <div style={{textAlign: 'center'}}>
                {map(this.props.data.columns, (column, k) => {
                    return (
                        <div key={k} className={'col-md-' + column.width}>
                            <div contentEditable="true" dangerouslySetInnerHTML={{__html: column.innerHTML}}/>
                        </div>
                    );
                })}
            </div>
            /*jshint ignore:end */
        );
    }
}

export default class Default extends Plugin {
    constructor() {
        super({
            name: 'row',
            version: '0.0.1',
            section: Section,
            create: function () {
                return new SectionModel(
                    this.name,
                    this.version,
                    this.args,
                    {
                        columns: [
                            {
                                width: 6,
                                innerHTML: '<p>Left column</p>'
                            },
                            {
                                width: 6,
                                innerHTML: '<p>Right column</p>'
                            }
                        ]
                    }
                );
            },
            parse: function (section) {
                return {
                    columns: section.dataset.columns
                };
            }
        });
    }
}
