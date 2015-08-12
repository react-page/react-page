'use strict';

var React = require('react'), Action,
    interact = require('interact.js');

Action = React.createClass({
    componentDidMount: function () {
        var action = React.findDOMNode(this.refs.action),
            origin = React.findDOMNode(this.refs.origin),
            self = this;
        interact(action).draggable({
            onmove: function (event) {
                var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            onstart: function(event) {
                origin.classList.add('missing');
                self.props.editor.actions.section.drag(self.props.plugin, self.props.version, self.props.options);
            },
            onend: function (event) {
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
    },
    render: function () {
        return (
            <div key={this.props.y} className="col-xs-4 toolbar-section-tile" ref="origin">
                <div>
                    <div className="toolbar-section-action text-center" ref="action">
                        <div dangerouslySetInnerHTML={{__html: this.props.innerHTML}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Action;
