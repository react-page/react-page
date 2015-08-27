/* global window, require */
import React from 'react';
import Scribe from 'scribe-editor';
import Store from './Store';
import assign from 'lodash/object/assign';
import getKey from 'app/pkg/getKey';
import timeout from 'app/pkg/timeout';
import compare from 'app/pkg/compare';


function isCaret(sel) {
    return sel.anchorOffset !== sel.focusOffset || sel.anchorNode !== sel.focusNode
}

function normalizeSelection(sel) {
    return {
        anchorOffset: sel.anchorOffset,
        focusOffset: sel.focusOffset,
        anchorNode: sel.anchorNode,
        focusNode: sel.focusNode
    }
}

export default class Section extends React.Component {
    constructor(props) {
        super(props);
        // Does not require any rendering hence not managed by React's state.
        this.prevSelection = {};
        this.state = {
            instance: null,
            focus: false
        };
    }

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.editable),
            scribe = new Scribe(editable);

        this.setState({
            instance: scribe,
            editable: editable
        });

        Store.action.listen((state) => {
            //var action = state.triggeredAction;
            //if (action === null || !this.isInFocus()) {
            //    return;
            //}
            //scribe.invokeElement(action.invoke, action.options || {});
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

    keyDown(event) {
        var code = getKey(event),
            direction;

        // Has key up/down/left/right been pressed?
        if (code === 37 || code === 38) {
            // pressed arrow up / left -> moving "up" in contenteditable
            direction = 1;
        } else if (code === 39 || code === 40) {
            // pressed arrow down / right -> moving "down" in contenteditable
            direction = -1;
        } else {
            // Some other key was pressed..proceed
            return;
        }

        // FIXME The default action needs to run first in order to update the caret/selection.
        // FIXME this is unfortunate, because it requires us to use a setTimeout() hack.
        timeout.setTimeout(() => {
            var sel = window.getSelection();
            if (isCaret(sel)) {
                // It's a range, not a single caret. Cross-section selection needs to be handled elsewhere...
                return;
            }

            if (!compare(this.prevSelection, sel, ['anchorOffset', 'focusOffset', 'focusNode', 'anchorNode'])) {
                this.prevSelection = normalizeSelection(sel);
                return;
            }

            console.log('moving', direction > 0 ? 'up' : 'down', 'please select area...');
        }, 1);
    }

    render() {
        return (
            /*jshint ignore:start */
            <div onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)}>
                <div ref="editable" onKeyDown={this.keyDown.bind(this)}
                     dangerouslySetInnerHTML={{__html: this.props.data.innerHTML}}/>
            </div>
            /*jshint ignore:end */
        );
    }
}
