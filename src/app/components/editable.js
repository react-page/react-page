'use strict';

var React = require('react'),
    _ = require('underscore'),
    DragDropContext = require('react-dnd').DragDropContext,
    HTML5Backend = require('react-dnd/modules/backends/HTML5'),
    NativeTypes = HTML5Backend.NativeTypes,
    Editable;

function preventDefault(event) {
    event.preventDefault()
}

Editable = React.createClass({
    getDefaultState: function() {
        return {
            components: []
        };
    },
    handleDrop(index, item) {
        console.log(index, item);
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
            <div onDrop={this.handleDrop}>
                {this.state.components}
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(Editable);

// <div editor={ this.props.editor } data={ this.props.data } content={ e.innerHTML } children={ e.children }/>

