'use strict';

var React = require('react'),
    Slideout = require('slideout'),
    DragSource = require('react-dnd').DragSource,
    Sections = require('./toolbar/sections'),
    _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            slideout: null,
            togglerOpacity: 1
        }
    },
    getDefaultProps: function () {
        return {
            padding: 256,
            tolerance: 70,
            zIndex: 9000
        };
    },
    componentDidMount: function () {
        var menu = React.findDOMNode(this.refs.menu),
            panel = React.findDOMNode(this.refs.panel),
            slideout = new Slideout({
                panel: panel,
                menu: menu,
                padding: this.props.padding,
                tolerance: this.props.tolerance
            });
        this.setState({
            slideout: slideout
        });
        slideout.open();
    },
    toggleToolbar: function() {
        this.state.slideout.toggle();
        var opacity = this.state.slideout.isOpen() ? 1 : .3;
        this.setState({
            togglerOpcaity: opacity
        });
    },
    render: function () {
        return (
            /*jshint ignore:start */
            <div>
                <nav ref="menu" className="toolbar" style={{zIndex: this.props.zIndex}}>
                    <Sections></Sections>
                </nav>
                <div ref="panel" className="toolbar-toggler" style={{zIndex: this.props.zIndex + 1, opacity: this.state.togglerOpcaity}}>
                    <span onClick={this.toggleToolbar} className="fa fa-bars fa-2x"></span>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});
