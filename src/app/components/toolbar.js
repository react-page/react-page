'use strict';

var React = require('react'),
    Slideout = require('slideout'),
    DragSource = require('react-dnd').DragSource,
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
            zIndex: 9000,
            sections: [
                {
                    title: 'Text',
                    actions: [
                        {innerHTML: '<span class="fa fa-th-large fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-th fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-columns fa-3x"></span>'}
                    ]
                },
                {
                    title: 'Media',
                    actions: [
                        {innerHTML: '<span class="fa fa-youtube-play fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-soundcloud fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-twitter fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-vimeo fa-3x"></span>'}
                    ]
                },
                {
                    title: 'Charts',
                    actions: [
                        {innerHTML: '<span class="fa fa-area-chart fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-pie-chart fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-bar-chart fa-3x"></span>'}
                    ]
                },
                {
                    title: 'Payment',
                    actions: [
                        {innerHTML: '<span class="fa fa-credit-card fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-paypal fa-3x"></span>'},
                        {innerHTML: '<span class="fa fa-google-wallet fa-3x"></span>'}
                    ]
                }
            ]
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
    renderToolbarSections: function() {
        var sections = [];
        _.each(this.props.sections, function(group, i){
            var actions = [];
            _.each(group.actions, function(action, y) {
                actions.push(<div key={y} className="col-xs-4 toolbar-section-action text-center" dangerouslySetInnerHTML={{__html: action.innerHTML}}></div>);
            });

            sections.push((
                <section className="toolbar-section" key={i}>
                    <div className="toolbar-section-header">{group.title}</div>
                    <div className="row toolbar-section-group">
                        {actions}
                    </div>
                </section>
            ));

        });
        return sections;
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
                    <div className="container-fluid">
                        <header className="toolbar-header">
                            Pick a layout
                        </header>
                        {this.renderToolbarSections()}
                    </div>
                </nav>
                <div ref="panel" className="toolbar-toggler" style={{zIndex: this.props.zIndex + 1, opacity: this.state.togglerOpacity}}>
                    <span onClick={this.toggleToolbar} className="fa fa-bars fa-2x"></span>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});
