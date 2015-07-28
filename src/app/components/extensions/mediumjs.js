/* global require, module, document */
'use strict';

var React = require('react'),
    Medium = require('Medium.js'),
    _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            instance: null
        };
    },
    componentDidMount: function () {
        var editable = React.findDOMNode(this.refs.editable);
        this.setState({
            instance: new Medium({
                element: editable,
                mode: Medium.richMode,
                attributes: null,
                tags: null,
                pasteAsText: false,
                beforeInvokeElement: function(){
                    console.log(this);
                },
                beforeInsertHtml: function () {
                    console.log('before html');
                },
                beforeAddTag: function (tag, shouldFocus, isEditable, afterElement) {
                    console.log('before tag');
                }
            }),
            editable: editable
        });
    },
    isInFocus: function () {
        return document.activeElement === this.state.editable;
    },
    toolbarAction: function (action) {
        return function (event) {
            event.preventDefault();
            if (!this.isInFocus()) {
                this.state.instance.select();
            }
            this.state.instance.invokeElement('strong', {
                title: "I've been struck!",
                style: "color: #e6db74"
            });
        }.bind(this);
    },
    render: function () {
        var actions = [{
            invoke: 'b',
            inner: 'B'
        }], buttons = [];

        _.each(actions, function (action, i) {
            buttons.push(<button key={i} className="btn btn-group"
                                 onMouseDown={this.toolbarAction(action)}>{action.inner}</button>)
        }.bind(this));

        return (
            /*jshint ignore:start */
            <div>
                <div className={this.state.instance ? '': ' hidden'}>
                    {buttons}
                </div>
                <div className="editable-component" ref="editable"
                     dangerouslySetInnerHTML={{__html: this.props.content}}>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});
