import React from 'react';

export default class Actions extends React.Component {
    constructor() {
        super();
        this.state = {instance: null, focus: false};
    }

    render() {
        return (
            /*jshint ignore:start */
            <ul>
                {u.map()}
                <li>
                    <a class=""></a>
                </li>
            </ul>
            /*jshint ignore:end */
        );
    }
}

Actions.defaultProps = {
    actions: []
};
