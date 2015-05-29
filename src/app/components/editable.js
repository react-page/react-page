var React = require('react'),
    ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin,
    Editable,
    _ = require('underscore');

Editable = React.createClass({
    getInitialProps: function() {
        return {
            src: 'apps/default'
        };
    },
    componentWillMount: function() {
        console.log(this.props);
    },
    render: function () {


        return (
            /*jshint ignore:start */
            <div dangerouslySetInnerHTML={{__html: this.props.content}}/>
            /*jshint ignore:end */
        );
    }
});

module.exports = Editable;
