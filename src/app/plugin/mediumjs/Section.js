/* global window, require */
import React from 'react';
import Scribe from 'scribe-editor';
import Store from './Store';

export default class Section extends React.Component {
    constructor() {
        super();
        this.state = {instance: null, focus: false};
    }

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.editable);
        var scribe = new Scribe(editable);

        this.setState({
            instance: scribe,
            editable: editable
        });

        Store.action.listen((state) => {
            var action = state.triggeredAction;
            if (action === null || !this.isInFocus()) {
                return;
            }
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
