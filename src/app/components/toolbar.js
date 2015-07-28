'use strict';

var React = require('react'),
    Slideout = require('slideout'),
    DragSource = require('react-dnd').DragSource;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            slideout: null
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
    render: function () {
        return (
            /*jshint ignore:start */
            <div>
                <nav ref="menu" className="toolbar" style={{zIndex: this.props.zIndex}}>
                    <div className="container-fluid">
                        <header className="toolbar-header">
                            Pick a layout
                        </header>
                        <section className="toolbar-section">
                            <div className="toolbar-section-header">Plugin A</div>
                            <div className="row toolbar-section-group">
                                <div className="col-xs-5 toolbar-section-action">
                                    <a href="#">Function 1</a>
                                </div>
                                <div className="col-xs-5 col-xs-offset-1 toolbar-section-action">
                                    <a href="#">Function 1</a>
                                </div>
                            </div>
                        </section>
                        <section className="toolbar-section">
                            <div className="toolbar-section-header">Plugin A</div>
                            <div className="row toolbar-section-group">
                                <div className="col-xs-5 toolbar-section-action">
                                    <a href="#">Function 3</a>
                                </div>
                                <div className="col-xs-5 col-xs-offset-1 toolbar-section-action">
                                    <a href="#">Function 4</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </nav>

                <main ref="panel">
                    <header>
                        <h2>Panel</h2>
                    </header>
                </main>
            </div>
            /*jshint ignore:end */
        );
    }
});
