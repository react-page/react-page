'use strict';

var React = require('react'),
    _ = require('underscore'),
    DragSource = require('react-dnd').DragSource,
    PropTypes = React.PropTypes,
    ItemTypes = require('app/types'),
    Action;

var actionSource = {
    beginDrag: function (props) {
        return {
            name: props.name
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

Action = React.createClass({
    propTypes: {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        isDropped: PropTypes.bool.isRequired
    },
    render: function () {
        var connectDragSource = this.props.connectDragSource;
        return connectDragSource(
            <div key={this.props.y} className="col-xs-4 toolbar-section-action text-center">
                <div draggable="true" dangerouslySetInnerHTML={{__html: this.props.innerHTML}}>
                </div>
            </div>
        );
    }
});

module.exports = DragSource(ItemTypes.PLUGIN, actionSource, collect)(Action);
