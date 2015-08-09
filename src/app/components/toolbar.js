'use strict';
var React = require('react'),
    DragSource = require('react-dnd').DragSource,
    Sections = require('./toolbar/sections'),
    Slideout = require('../libs/slideout'),
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
            tolerance: 70
        };
    },
    componentDidMount: function () {
        var menu = React.findDOMNode(this.refs.menu),
            slideout = new Slideout({
                panel: document.querySelector('.push'),
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
                <nav ref="menu" className="toolbar">
                    <Sections></Sections>
                </nav>
                <div className="toolbar-toggler" style={{opacity: this.state.togglerOpcaity}}>
                    <span onClick={this.toggleToolbar} className="fa fa-bars fa-2x"></span>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});
