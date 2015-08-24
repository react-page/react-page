import React from 'react';
import interact from 'interact.js';
import Actions from 'app/Actions';

export default class Tile extends React.Component {
    componentDidMount() {
        this.startDraggable();
    }

    componentDidUpdate() {
        this.startDraggable();
    }

    startDraggable() {
        var action = React.findDOMNode(this.refs.action),
            origin = React.findDOMNode(this.refs.origin),
            self = this;

        interact(action).draggable({
            onmove (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onstart(event) {
                origin.classList.add('is-missing');
                event.target.classList.add('is-dragging');
                Actions.toolbar.pluginDragBegin(self.props.name, self.props.version, self.props.options);
            },
            onend (event) {
                origin.classList.remove('is-missing');
                event.target.classList.remove('is-dragging');
                event.target.style.webkitTransform =
                    event.target.style.transform = 'none';
                event.target.setAttribute('data-x', '0');
                event.target.setAttribute('data-y', '0');
            },
            restrict: {
                restriction: 'parent',
                endOnly: true
            }
        });
    }

    render() {
        return (
            /*jshint ignore:start */
            <div className="toolbar-button" ref="origin">
                <div className="toolbar-button-inner toolbar-draggable" ref="action">
                    <div className={this.props.icon}></div>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
}
