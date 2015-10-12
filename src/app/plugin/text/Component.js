import React  from 'react';
import map from 'lodash/collection/map';
import cloneDeep from 'lodash/lang/cloneDeep';
import Editor from 'medium-editor';
import async from 'async';
import HTMLParser from './HTMLParser';
import isEmpty from 'lodash/lang/isEmpty';
import store from 'app/store/Editable';
import Actions from 'app/actions/Editable';

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

// mapEmptyLinesToPlugin maps empty lines from plugin text to plugin placeholder
function mapEmptyLinesToPlugin(sections) {
    return map(sections, (section) => {
        if (isEmpty(section.data)) {
            // FIXME make this configurable or something
            section.plugin = 'placeholder';
        }
        return section;
    })
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
            // TODO FIXME upstream https://github.com/yabwe/medium-editor/issues/543
            unwrap(editable.querySelectorAll(':scope [style]'));

            var sections = editable.querySelectorAll(':scope > *');

            // TODO find id...
            store.dispatch({
                type: Actions.update,
                id: this.props.id,
                sections: HTMLParser.parse(sections)
            });

            if (sections.length !== this.props.sections.length) {
                // transform HTML to sections
                // create a diff
                // patch the sections, new sections == 'new' plugin, update
            } else {
                // something else happened (text update)
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
