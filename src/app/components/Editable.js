'use strict';

import React  from 'react';
import map from 'lodash/collection/map';
import interact from'interact.js';
import Section from 'app/entity/Section';
import EditableStore from 'app/store/Editable';

export default class Editable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: props.model.sections || [],
            drag: {plugin: '', version: '', options: {}}
        };
    }

    componentDidUpdate() {
        this.initializeDroppableZones(this.state.children);
    }

    componentDidMount() {
        this.initializeDroppableZones(this.state.children);
        EditableStore.listen((plugin) => {
            this.setState({drag: plugin.lastDraggedPlugin});
        });
    }

    initializeDroppableZones() {
        for (var i = 0; i <= this.state.children.length; i++) {
            var element = React.findDOMNode(this.refs['placeholder' + (i).toString()]);
            if (element === null) {
                console.log('Could not find editable section placeholder: placeholder' + (i).toString());
                continue;
            }
            this.interact(element, i);
        }
    }

    interact(element, key) {
        interact(element).dropzone({
            overlap: this.props.overlap,
            ondropactivate (event) {
                event.target.classList.add('drop-active');
            },
            ondragenter (event) {
                var draggable = event.relatedTarget, dropzone = event.target;
                dropzone.classList.add('drop-target');
                draggable.classList.add('can-drop');
            },
            ondragleave (event) {
                event.target.classList.remove('drop-target');
                event.relatedTarget.classList.remove('can-drop');
            },
            ondropdeactivate (event) {
                event.target.classList.remove('drop-active');
                event.target.classList.remove('drop-target');
            },
            ondrop: function (event) {
                var drag = this.state.drag, pluginName = drag.name, version = drag.version, args = drag.args,
                    plugin = this.props.editor.plugins.get(pluginName, version, args).createSection(pluginName, version, args),
                    children = this.state.children.slice();
                children.splice(key, 0, plugin);
                this.setState({children: children});
            }.bind(this)
        });
    }

    renderComponent(child, key) {
        var pluginManager = this.props.editor.plugins,
            plugin = pluginManager.get('default'),
            Section = plugin.Section,
            ref = 'placeholder' + key.toString();

        if (pluginManager.has(child.name)) {
            plugin = pluginManager.get(child.name);
            Section = plugin.Section;
        }

        return (
            /*jshint ignore:start */
            <div key={child.id}>
                <div className="editable-section">
                    <Section name={child.name}
                             id={child.id}
                             plugin={plugin}
                             version={child.version}
                             args={child.args}
                             data={child.data}/>
                </div>
                <div ref={ref} className="editable-section-placeholder">
                    <span className="fa fa-plus"></span>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }

    render() {
        return (
            /*jshint ignore:start */
            <div className="editable-object">
                <div ref={'placeholder0'} className="editable-section-placeholder">
                    <span className="fa fa-plus"></span>
                </div>
                {map(this.state.children, (child, key) => this.renderComponent(child, key + 1))}
            </div>
            /*jshint ignore:end */
        );
    }
}


Editable.initialProps = {
    overlap: 0.5
};
