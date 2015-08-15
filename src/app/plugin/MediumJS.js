/* global window, require */
import React from 'react';
import u from 'underscore';
import Animate from 'rc-animate';
import Plugin from 'app/service/plugin/Plugin';
import Medium from 'medium.js';

// TODO Dirtiest hack of my life
// Upstream issue: https://github.com/jakiestfu/Medium.js/issues/163
(function () {
    window.rangy = require('rangy');
    window.Undo = require('undo.js');
    require('rangy/lib/rangy-classapplier.js');
})();

class Component extends React.Component {
    constructor() {
        super();
        this.state = {instance: null, focus: false};
    }

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.editable);
        this.setState({
            instance: new Medium({
                element: editable,
                mode: Medium.richMode,
                attributes: null,
                tags: null,
                pasteAsText: false,
                keyContext: {
                    enter: function (e, element) {
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
    }

    toolbarAction(action) {
        return function (event) {
            event.preventDefault();
            if (!this.isInFocus()) {
                this.state.instance.select();
            }
            this.state.instance.invokeElement(action.invoke, action.options || {});
        }.bind(this);
    }

    listAction(outer) {
        outer = outer === 'ul' ? 'ul' : 'ol';
        return function (event) {
            var outer = document.createElement(outer || 'ul'),
                inner = document.createElement('li');
            event.preventDefault();
            outer.appendChild(inner);
            this.state.instance.focus();
            this.state.instance.insertHtml(outer);
        }.bind(this);
    }

    focus() {
        this.setState({focus: true});
    }

    blur() {
        this.setState({focus: false});
    }

    isInFocus() {
        return document.activeElement === this.state.editable;
    }

    createButton(action, i) {
        return (<button key={i} className="btn btn-primary" onMouseDown={this.toolbarAction(action).bind(this)}>
            <span className={action.icon}></span>
        </button>);
    }

    createListButton(index, outer) {
        var cn = 'fa fa-list' + (outer === 'ul' ? '' : '-ol');
        return (<button key={index+1} className="btn btn-primary" onMouseDown={this.listAction(outer).bind(this)}>
            <span className={cn}></span>
        </button>)
    }

    render() {
        var buttons = [];
        u.each(this.props.actions, (k, v) => buttons.push(this.createButton(k, v)));
        buttons.push(this.createListButton(buttons.length, 'ul'));
        buttons.push(this.createListButton(buttons.length, 'ol'));
        return (
            /*jshint ignore:start */
            <div onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)}>
                <Animate showProp="visible" transitionName="fade">
                    <div visible={this.state.focus}
                         style={{margin: '10px 0', display: this.state.focus ? 'block' : 'none'}}>
                        <div className="btn-group">
                            {buttons}
                        </div>
                    </div>
                </Animate>

                <div ref="editable" dangerouslySetInnerHTML={{__html: this.props.model.data.innerHTML}}>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
}

Component.defaultProps = {
    actions: [
        {invoke: 'strong', icon: 'fa fa-bold'},
        {invoke: 'em', icon: 'fa fa-italic'}
    ]
};

export default class MediumJS extends Plugin {
    constructor() {
        super({
            name: 'mediumjs',
            version: '0.0.1',
            plugin: Component,
            toolbar: {
                tile: () => {innerHTML: '<span class="fa fa-medium"></span>'},
                actions: () => [
                    {
                        innerHTML: '<span class="fa fa-medium"></span>'
                    }
                ]
            }
        });
    }
}
