import React from 'react';
import interact from 'interact.js';

export default class Tile extends React.Component {
    componentDidMount () {
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
                origin.classList.add('missing');
                self.props.editor.actions.section.drag(self.props.plugin, self.props.version, self.props.options);
            },
            onend (event) {
                origin.classList.remove('missing');
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
    render () {
        return (
            /*jshint ignore:start */
            <div key={this.props.y} className="col-xs-1 toolbar-section-tile" ref="origin">
                <div className="toolbar-section-action text-center" ref="action" dangerouslySetInnerHTML={{__html: this.props.tileHTML}}>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
}
