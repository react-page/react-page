/* global window, require */
import React from 'react';
import Medium from 'medium.js';
import Store from './Store';

export default class Section extends React.Component {
    constructor() {
        super();
        this.state = {instance: null, focus: false};
    }

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.editable);
        var medium = new Medium({
            element: editable,
            mode: Medium.richMode,
            attributes: null,
            tags: null,
            pasteAsText: false,
            keyContext: {
                enter: function (e, element) {
                    var sib = element.previousSibling;
                    if (sib && sib.tagName === 'LI') {
                        element.style.color = sib.style.color;
                        element.className = sib.className;
                        this.cursor.caretToBeginning(element);
                    }
                }
            }
        });

        this.setState({
            instance: medium,
            editable: editable
        });

        Store.action.listen((state) => {
            var action = state.triggeredAction;
            if (action === null || !this.isInFocus()) {
                return;
            }
            medium.invokeElement(action.invoke, action.options || {});
        })
    }

    focus() {
        this.setState({focus: true});
        this.props.plugin.focus(this);
    }

    blur() {
        this.setState({focus: false});
        this.props.plugin.blur(this);
    }

    isInFocus() {
        return this.state.focus;
    }

    render() {
        return (
            /*jshint ignore:start */
            <div onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)}>
                <div ref="editable" dangerouslySetInnerHTML={{__html: this.props.data.innerHTML}}/>
            </div>
            /*jshint ignore:end */
        );
    }
}
