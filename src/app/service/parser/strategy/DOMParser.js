import forEach from 'lodash/collection/forEach';
import ParserException from'app/exception/ParserException';
import Editable from'app/entity/Editable';
import Section from'app/entity/Section';
import ParsingStrategy from './ParsingStrategy';
import 'app/pkg/wrap';

const editables = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'section'];

/**
 * DOMParser is an parser strategy for transforming a DOM subtree into a normalized data model
 * the editor can work with.
 */
export default class DOMParser extends ParsingStrategy {

    /**
     *
     * @param element
     * @param data
     * @param options
     * @returns {*}
     */
    parse(element, data, options) {
        var dataset = element.dataset, children = [],
            field = dataset.field || '',
            nodes = element.childNodes,
            editable = new Editable(dataset.id, [], field),
            plugin = this.pluginManager.get('default');

        if (dataset.id === undefined) {
            // TODO how to ids
            // throw new ParserException('Editable object does not have an id');
            dataset.id = 0;
        }

        if (nodes.length < 1) {
            console.log('1');
            var div = document.createElement('p');
            div.innerHTML = '<br>';
            element.appendChild(div);
            children.push(new Section('default', null, null, plugin.parse(div, options)));
        } else {
            forEach(nodes, function (node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    if (node.textContent.trim().length < 1) {
                        return;
                    }
                    var e = document.createElement('p');
                    e.innerText = node.textContent.trim();
                    element.appendChild(e);
                    children.push(new Section('default', null, null, plugin.parse(e, options)));
                    return;
                }

                var extension = node.dataset.extension,
                    version = node.dataset.version;

                if (!extension && editables.indexOf(node.tagName) > -1) {
                    extension = 'default';
                    version = null;
                } else if (!extension) {
                    var p = document.createElement('p');
                    p.innerText = node.textContent.trim();
                    element.appendChild(p);
                    children.push(new Section('default', null, null, plugin.parse(node, options)));
                    return;
                }

                plugin = this.pluginManager.get(extension, version);
                children.push(new Section(extension, version, node.dataset.args,  plugin.parse(node, options)));
            }.bind(this));
        }
        editable.sections = children;

        return editable;
    }

    parseable(element, options) {
        try {
            this.parse(element, options);
            return true;
        } catch (e) {
            return false;
        }
    }
}
