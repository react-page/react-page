'use strict';

var React = require('react'),
    _ = require('underscore'),
    Action = require('./action');

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
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
    renderToolbarSections: function() {
        var sections = [];
        _.each(this.props.sections, function(group, i){
            var actions = [];
            _.each(group.actions, function(action, y) {
                actions.push(<Action innerHTML={action.innerHTML} y={y} />);
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
    render: function () {
        return (
            /*jshint ignore:start */
            <div className="container-fluid">
                <header className="toolbar-header">
                    Pick a layout
                </header>
                {this.renderToolbarSections()}
            </div>
            /*jshint ignore:end */
        );
    }
});
