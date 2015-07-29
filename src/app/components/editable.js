'use strict';

var React = require('react'),
    _ = require('underscore');

function preventDefault(event) {
    event.preventDefault()
}

module.exports = React.createClass({
    getInitialProps: function() {
        return {
            extension: 'fallback'
        };
    },
    getDefaultState: function() {
        return {
            components: []
        };
    },
    drop: function(event) {
        console.log('dropped!');
    },
    componentWillMount: function() {
        this.prepareComponents(this.props.editor.extensions);
    },
    prepareComponents: function(registry) {
        var components = [];
        _.each(this.props.children, function(child, key){
            var Extension = registry.get('fallback');
            if (registry.has(child.dataset.extension)) {
                Extension = registry.get(child.dataset.extension)
            }
            components.push(<Extension key={key} content={child.innerHTML}/>);
        }.bind(this));
        this.setState({
            components: components
        });
    },
    render: function () {
        return (
            /*jshint ignore:start */
            <div onDragOver={preventDefault} onDrop={this.drop}>
                {this.state.components}
            </div>
            /*jshint ignore:end */
        );
    }
});

// <div editor={ this.props.editor } data={ this.props.data } content={ e.innerHTML } children={ e.children }/>

