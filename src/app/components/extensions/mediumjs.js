/* global require, module, document */
'use strict';

// TODO Dirtiest hack of my life
// Upstream issue: https://github.com/jakiestfu/Medium.js/issues/163
window.rangy = require('rangy');
window.Undo = require('undo.js');
require('rangy/lib/rangy-classapplier.js');

var React = require('react'),
    Medium = require('medium.js'),
    _ = require('underscore'),
    Animate = require('rc-animate');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            instance: null,
            focus: false
        };
    },
    getDefaultProps: function () {
        return {
            actions: [
                {
                    invoke: 'strong',
                    icon: 'fa fa-bold',
                    options: {}
                },
                {
                    invoke: 'em',
                    icon: 'fa fa-italic',
                    options: {}
                }
            ]
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
                keyContext: {
                    'enter': function (e, element) {
                        var sib = element.previousSibling;
                        if (sib && sib.tagName == 'LI') {
                            element.style.color = sib.style.color;
                            element.className = sib.className;
                            this.cursor.caretToBeginning(element);
                        }
                    }
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
            this.state.instance.invokeElement(action.invoke, action.options);
        }.bind(this);
    },
    listAction: function (outer) {
        outer = outer === 'ul' ? 'ul' : 'ol';
        return function (event) {
            var outer = document.createElement(outer || 'ul'),
                inner = document.createElement('li');
            event.preventDefault();
            outer.appendChild(inner);
            this.state.instance.focus();
            this.state.instance.insertHtml(outer);
        }.bind(this);
    },
    focus: function () {
        this.setState({focus: true});
    },
    blur: function () {
        this.setState({focus: false});
    },
    createButton: function (action, i) {
        return (<button key={i}
                        className="btn btn-primary"
                        onMouseDown={this.toolbarAction(action)}>
            <span className={action.icon}></span>
        </button>);
    },
    createListButton: function (index, outer) {
        var cn = 'fa fa-list' + (outer === 'ul' ? '' : '-ol');
        return (<button key={index+1}
                        className="btn btn-primary"
                        onMouseDown={this.listAction(outer)}>
            <span className={cn}></span>
        </button>)
    },
    render: function () {
        var buttons = [];
        _.each(this.props.actions, function (k, v) {
            buttons.push(this.createButton(k, v));
        }.bind(this));
        buttons.push(this.createListButton(buttons.length, 'ul'));
        buttons.push(this.createListButton(buttons.length, 'ol'));
        return (
            /*jshint ignore:start */
            <div onFocus={this.focus} onBlur={this.blur}>
                <Animate showProp="visible" transitionName="fade">
                    <div visible={this.state.focus}
                         style={{margin: '10px 0', display: this.state.focus ? 'block' : 'none'}}>
                        <div className="btn-group">
                            {buttons}
                        </div>
                    </div>
                </Animate>

                <div ref="editable" onFocus={focus}
                     dangerouslySetInnerHTML={{__html: this.props.model.data.innerHTML}}>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});
