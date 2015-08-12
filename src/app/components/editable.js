'use strict';

var React = require('react'),
    _ = require('underscore'),
    interact = require('interact.js'),
    Editable;

Editable = React.createClass({
    getInitialState: function () {
        var children = [];
        _.each(this.props.children, function(v){
            children.push(v);
        });
        return {
            components: [],
            children: children
        };
    },
    getInitialProps: function () {
        return {
            overlap: 0.50,
            accept: '.toolbar-section-action'
        }
    },
    componentDidUpdate: function () {
        for (var i = 0; i <= this.state.children.length; i++) {
            var element = React.findDOMNode(this.refs['placeholder' + (i).toString()]);
            if (element === null) {
                console.log('Could not find editable section placeholder: placeholder' + (i).toString());
                continue;
            }
            this.initializeDroppableZones(element);
        }
    },
    componentDidMount: function () {
        for (var i = 0; i <= this.state.children.length; i++) {
            var element = React.findDOMNode(this.refs['placeholder' + (i).toString()]);
            if (element === null) {
                console.log('Could not find editable section placeholder: placeholder' + (i).toString());
                continue;
            }
            this.initializeDroppableZones(element);
        }
    },
    initializeDroppableZones: function (e) {
        var self = this;
        interact(e).dropzone({
            overlap: this.props.overlap,
            ondropactivate: function (event) {
                event.target.classList.add('drop-active');
            },
            ondragenter: function (event) {
                var draggable = event.relatedTarget, dropzone = event.target;
                dropzone.classList.add('drop-target');
                draggable.classList.add('can-drop');
            },
            ondragleave: function (event) {
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            },
            ondrop: function (event) {
                console.log('drop');
                self.setState({
                    children: self.state.children.concat(self.state.children[0])
                });
            },
            ondropdeactivate: function (event) {
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    },
    prepareComponents: function (child, key) {
        var registry = this.props.editor.extensions,
            Extension = registry.get('fallback'),
            ref = 'placeholder' + key.toString();

        if (registry.has(child.dataset.extension)) {
            Extension = registry.get(child.dataset.extension)
        }
        return (
            <div key={key}>
                <div className="editable-section">
                    <Extension content={child.innerHTML}/>
                </div>
                <div ref={ref} className="editable-section-placeholder">
                    <span className="fa fa-plus"></span>
                </div>
            </div>
        );
    },
    render: function () {
        return (
            /*jshint ignore:start */
            <div className="editable-object">
                <div ref={'placeholder0'} className="editable-section-placeholder">
                    <span className="fa fa-plus"></span>
                </div>
                {_.map(this.state.children, function (child, key) {
                    return this.prepareComponents(child, key + 1);
                }.bind(this))}
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = Editable;

