'use strict';

var React = require('react'),
    _ = require('underscore'),
    interact = require('interact.js'),
    Section = require('app/entity/Section'),
    Editable;

Editable = React.createClass({
    getInitialState: function () {
        var children = [];
        _.each(this.props.model.sections, function (v) {
            children.push(v);
        });
        return {
            children: children,
            drag: {
                plugin: '',
                version: '',
                options: {}
            }
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
            this.initializeDroppableZone(element, i);
        }
    },
    componentDidMount: function () {
        for (var i = 0; i <= this.state.children.length; i++) {
            var element = React.findDOMNode(this.refs['placeholder' + (i).toString()]);
            if (element === null) {
                console.log('Could not find editable section placeholder: placeholder' + (i).toString());
                continue;
            }
            this.initializeDroppableZone(element);
        }

        var stores = this.props.editor.stores;
        stores.drag.listen(function (plugin, version, options) {
            this.setState({
                drag: {
                    plugin: plugin,
                    version: version,
                    options: options
                }
            });
        }.bind(this));
    },
    initializeDroppableZone: function (e, key) {
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
                var pluginName = this.state.drag.plugin,
                    version = this.state.drag.version,
                    options = this.state.drag.options,
                    children = this.state.children.slice(),
                    plugin = this.props.editor.plugins.get(pluginName, version, options).create(pluginName, version, options);
                children.splice(key,0,plugin);
                this.setState({
                    children: children
                });
            }.bind(this),
            ondropdeactivate: function (event) {
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            }
        });
    },
    prepareComponents: function (child, key) {
        var plugins = this.props.editor.plugins,
            Section = plugins.get('fallback'),
            ref = 'placeholder' + key.toString();

        if (plugins.has(child.plugin)) {
            Section = plugins.get(child.plugin).Component;
        }
        return (
            <div key={key}>
                <div className="editable-section">
                    <Section model={child}/>
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

