import React from 'react';
import u from 'underscore';
import Tile from './toolbar/Tile';

export default class Toolbar extends React.Component {
    constructor() {
        super();
        this.state = {opacity: 0, closed: true, tiles: [], tilesClosed: true};
    }

    componentDidMount() {
        this.toggleToolbar();
    }

    toggleToolbar() {
        var closing = !this.state.closed,
            opacity = closing ? .3 : 1,
            height = (this.props.height).toString() + 'px',
            pushHeight = closing ? 0 : height,
            translate = (closing ? 0 : (-this.props.height).toString()) + 'px',
            toolbar = React.findDOMNode(this.refs['toolbar']),
            push = React.findDOMNode(this.refs['push']);

        toolbar.style.transform = 'translate(0, ' + translate + ')';
        toolbar.style.opacity = opacity;
        toolbar.style.height = height;
        toolbar.style.bottom = '-' + height;
        push.style.height = pushHeight;

        this.setState({opacity: opacity, closed: closing});
    }

    renderGroups() {
        return u.map(this.props.groups, group => {
            return (
                <div className="col-xs-4 col-sm-2 col-md-2 col-lg-1 toolbar-group"
                     onClick={this.toggleTiles(group).bind(this)}>
                    <div className="toolbar-group-inner">
                        <div className={group.icon}></div>
                    </div>
                </div>
            );
        })
    }

    toggleTiles(group) {
        return () => {
            var tiles = this.renderTiles(group);
            this.setState({tiles: tiles});
        };
    }

    renderTiles(group) {
        return u.map(group.items, group => {
            var plugin = this.props.editor.plugins.get(group.plugin, group.version),
                tiles = plugin.getToolbarTiles();
            return (
                <div>
                    {u.map(group.tiles, (t) => {
                        return (
                            <Tile editor={this.props.editor} plugin={tiles[t].plugin}
                                  options={tiles[t].options || {}} tileHTML={tiles[t].tileHTML}/>
                        )
                    })}
                </div>
            );
        });
    }


    render() {
        return (
            /*jshint ignore:start */
            <div>
                <nav ref="toolbar" className="toolbar">
                    <div className="toolbar-toggler" onClick={this.toggleToolbar.bind(this)}>
                        <span className={'fa ' + (this.state.closed ? 'fa-plus' : 'fa-times')}></span>
                    </div>
                    <div className="container-fluid toolbar-body" style={{height: this.props.height + 'px'}}>
                        <div className="toolbar-tiles" ref="tiles">
                            <div className="row">
                                {this.state.tiles}
                            </div>
                        </div>
                        <div className="toolbar-groups">
                            <div className="row">
                                {this.renderGroups()}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="toolbar-push" ref="push"></div>
            </div>
            /*jshint ignore:end */
        );
    }
}

Toolbar.defaultProps = {
    height: 100,
    groups: [
        {
            title: 'Medium',
            icon: 'fa fa-medium',
            plugin: 'mediumjs'
        },
        {
            title: 'Default',
            icon: 'fa fa-font',
            plugin: 'mediumjs'
        }
    ]
};
