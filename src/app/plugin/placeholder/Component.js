import React from 'react';

export default class Component extends React.Component {
    componentDidMount() {
        let e = React.findDOMNode(this.refs.area);
        e.focus();
    }

    change() {

    }

    render() {
        return (
            /*jshint ignore:start */
            <p>
                <input type="button" value="+" />
                <textarea ref="area" onChange={this.change}></textarea>
            </p>
            /*jshint ignore:end */
        );
    }
}
