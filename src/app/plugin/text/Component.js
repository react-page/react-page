import React  from 'react';
import map from 'lodash/collection/map';
import cloneDeep from 'lodash/lang/cloneDeep';
import Editor from 'medium-editor';
import async from 'async';
import HTMLParser from './HTMLParser';
import isEmpty from 'lodash/lang/isEmpty';
import Actions from 'app/actions/Partition';
import find from 'lodash/collection/find';

import './css/medium-editor.css';
import './css/themes/default.css';

function unwrap(elements) {
    async.each(elements, (el) => {
        // get the element's parent node
        var parent = el.parentNode;

        // move all children out of the element
        while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
        }

        // remove the empty element
        parent.removeChild(el);
    });
}

export default class Component extends React.Component {
    componentWillMount() {
        this.setState({
            inner: map(this.props.sections, (s) => {
                var attrs = map(s.attrs, (v, k) => (k + '="' + v + '"')).join(' ') || '',
                    tag = (s.data.tag || 'p'), elem = (tag + ' ' + attrs).trim();
                return '<' + elem + ' data-id' + '="' + s.id + '">' + s.data.inner + '</' + tag + '>';
            }).join('')
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        var e = React.findDOMNode(this.refs.area);
        return e.innerHTML !== nextState.inner;
    }

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.area),
            editor = new Editor(editable, {toolbar: {buttons: ['bold', 'italic', 'anchor', 'h2', 'h3', 'quote']}});
        this.setState({editor: editor});
        editor.subscribe('editableInput', (event, editable) => {
            // TODO FIXME upstream https://github.com/yabwe/medium-editor/issues/543
            unwrap(editable.querySelectorAll(':scope [style]'));
            let sections = HTMLParser.parse(editable.querySelectorAll(':scope > *'), 'placeholder');

            // TODO FIXME this is a sort-of hack to prevent re-rendering the sections on every input change.
            let shouldUpdate = !isEmpty(find(sections, (s) => s.plugin === 'placeholder'));
            if (shouldUpdate) {
                this.props.store.dispatch({
                    type: Actions.replace,
                    // FIXME make this configurable or something
                    with: sections
                });
            }
        });
    }

    render() {
        console.log('so render');

        return (
            /*jshint ignore:start */
            <div ref="area" dangerouslySetInnerHTML={{__html: this.state.inner}}/>
            /*jshint ignore:end */
        );
    }
}
