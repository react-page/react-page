'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            /*jshint ignore:start */
            <div contentEditable="true" dangerouslySetInnerHTML={{__html: this.props.model.data.innerHTML}} />
            /*jshint ignore:end */
        );
    }
});
