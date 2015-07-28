'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            /*jshint ignore:start */
            <div className="editable-component" contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.content}} />
            /*jshint ignore:end */
        );
    }
});
