import React from 'react';

export default class Component extends React.Component {
    componentDidMount() {
        console.log('focus2');
        let e = React.findDOMNode(this.refs.field);
        console.log('focus3', e);
        e.focus();
        console.log('focus');
    }

    render() {
        console.log('123123');
        return (
            /*jshint ignore:start */
            <p>
                +
                <input ref="field" type="text"></input>
            </p>
            /*jshint ignore:end */
        );
    }
}
