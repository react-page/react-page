import React from 'react';
import map from 'lodash/collection/map';
import Tile from './toolbar/Tile';
import transform from 'app/pkg/transform';
import ToolbarStore from 'app/store/Toolbar';

export default class Toolbar extends React.Component {
    constructor() {
        super();
        this.state = {
            closed: true,
            pluginToolbarClosed: true,
            tiles: [],
            tilesClosed: true,
            pluginToolbar: null
        };
    }

    componentDidMount() {
        this.toggleToolbar(this.refs.toolbar, !this.state.closed);
        this.setState({closed: !this.state.closed});

        ToolbarStore.listen((state) => {
            var plugin = state.plugin, pluginToolbar = null, closed, toolbarClosed;
            if (plugin && plugin.name) {
                // this id is required to prevent REACT from wrongfully not updating the toolbar.
                var id = Math.random();
                var PluginToolbar = this.props.editor.plugins.get(plugin.name, plugin.version, plugin.args).Toolbar;
                pluginToolbar = (
                    /*jshint ignore:start */
                    <PluginToolbar key={id} context={state.context.props}/>
                    /*jshint ignore:end */
                );
                closed = true;
                toolbarClosed = false;
            } else {
                closed = false;
                toolbarClosed = true;
            }

            // nothing changed in the state, so no need to toggle the toolbars.
            if (this.state.closed === closed) {
                this.setState({pluginToolbar: pluginToolbar});
                this.forceUpdate();
                return;
            }

            this.toggleToolbar(this.refs.pluginToolbar, toolbarClosed);
            this.toggleToolbar(this.refs.toolbar, closed);
            this.setState({
                pluginToolbarClosed: toolbarClosed,
                closed: closed,
                pluginToolbar: pluginToolbar
            });
        });
    }

    toggleToolbar(ref, closing) {
        var toolbar = React.findDOMNode(ref);
        var opacity = closing ? 0.3 : 0.97;
        var height = (this.props.height).toString() + 'px',
            pushHeight = closing ? 0 : height,
            translate = (closing ? 0 : (-this.props.height).toString()) + 'px',
            push = React.findDOMNode(this.refs.push);

        transform(toolbar, 'translate(0, ' + translate + ')');

        toolbar.style.height = height;
        toolbar.style.bottom = '-' + height;
        toolbar.style.opacity = opacity;

        push.style.height = pushHeight;
    }

    render() {
        return (
            /*jshint ignore:start */
            <div>
                <div ref="pluginToolbar" className="toolbar">
                    <div className="toolbar-body">
                        {this.state.pluginToolbar}
                    </div>
                </div>
                <nav ref="toolbar" className="toolbar">
                    <div className="container-fluid toolbar-body" style={{height: this.props.height + 'px'}}>
                        {map(this.props.groups, (group, y) => {
                            return (
                                <Tile key={y} icon={group.icon} editor={this.props.editor} name={group.plugin}
                                      version={group.version || ''} options={group.options || {}}>
                                </Tile>
                            );
                        })}
                    </div>
                </nav>
                <div className="toolbar-push" ref="push"></div>
            </div>
            /*jshint ignore:end */
        );
    }
}

Toolbar.defaultProps = {
    height: 70,
    groups: [
        {
            title: 'Embed media',
            icon: 'fa fa-paperclip',
            plugin: 'embed'
        },
        {
            title: 'Rich',
            icon: 'fa fa-align-left',
            plugin: 'mediumjs'
        },
        {
            title: 'Image',
            icon: 'fa fa-picture-o',
            plugin: 'default'
        }
    ]
};
