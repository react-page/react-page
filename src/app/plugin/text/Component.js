import React  from 'react';
import map from 'lodash/collection/map';
import cloneDeep from 'lodash/lang/cloneDeep';
import Editor from 'medium-editor';
import async from 'async';

import './css/medium-editor.css';
import './css/themes/default.css';

function unwrap(elements) {
    async.each(elements, (el) => {
        // get the element's parent node
        var parent = el.parentNode;

        // move all children out of the element
        while (el.firstChild) parent.insertBefore(el.firstChild, el);

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

    componentDidMount() {
        var editable = React.findDOMNode(this.refs.area);
        var editor = new Editor(editable, {
            toolbar: {
                buttons: ['bold', 'italic', 'anchor', 'h2', 'h3', 'quote']
            }
        });
        var all = editable.querySelectorAll(':scope > *')[0];

        editor.subscribe('editableInput', (event, editable) => {
            unwrap(editable.querySelectorAll(':scope [style]'));

            var sections = editable.querySelectorAll(':scope > *');
            if (sections.length > this.props.sections.length) {
                // transform HTML to sections
                // create a diff
                // patch the sections, new sections == 'new' plugin, update

                // added
                var newlines = editable.querySelectorAll(':scope > p > br');
                async.each(newlines, (newline) => {
                    console.log('an empty was found', newline.parentNode, newline.parentNode.dataset);
                });
            } else if (sections.length < this.props.sections.length) {
                // removed
            }
        });
        this.setState({editor: editor});
    }

    render() {
        return (
            /*jshint ignore:start */
            <div ref="area" dangerouslySetInnerHTML={{__html: this.state.inner}}/>
            /*jshint ignore:end */
        );
    }
}
