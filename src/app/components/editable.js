'use strict';

var React = require('react'),
    _ = require('underscore');

module.exports = React.createClass({
    getInitialProps: function() {
        return {
            extension: 'fallback'
        };
    },
    componentWillMount: function() {
    },
    render: function () {
        var components = [],
            registry = this.props.editor.extensions;

        _.each(this.props.children, function(child, key){
            var Extension = registry.get('fallback');
            if (registry.has(child.dataset.extension)) {
                Extension = registry.get(child.dataset.extension)
            }
            components.push(<Extension key={key} content={child.innerHTML}/>);
        });

        return (
            /*jshint ignore:start */
            <div className="editable-component">
                {components}
            </div>
            /*jshint ignore:end */
        );
    }
});

// <div editor={ this.props.editor } data={ this.props.data } content={ e.innerHTML } children={ e.children }/>
