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
            nodes = element.childNodes;

        if (dataset.id === undefined) {
            // TODO how to ids
            // throw new ParserException('Editable object does not have an id');
            dataset.id = 0;
        }


        // FIXME
        /**
         * ...
         */
        if (nodes.length < 1) {
            var div = document.createElement('p'),
                plugin = this.pluginManager.get('default');
            div.innerHTML = '<br>';
            children.push(new Section('default', null, null, plugin.parse(div, options)));
        } else {
            forEach(nodes, (node, k) => {
                var plugin = this.pluginManager.get('default');
                if (node.nodeType === Node.TEXT_NODE) {
                    if (node.textContent.trim().length < 1) {
                        return;
                    }
                    var e = document.createElement('p');
                    e.innerText = node.textContent.trim();
                    children.push(new Section('default', null, null, plugin.parse(e, options)));
                    return;
                }

                var extension = node.dataset.extension,
                    version = node.dataset.version;

                if (extension === undefined && editables.indexOf(node.tagName.toLowerCase()) > -1) {
                    var div = document.createElement('div');
                    div.innerHTML = node.outerHTML;
                    children.push(new Section('default', null, null, plugin.parse(div, options)));
                    return;
                } else if (!extension) {
                    var p = document.createElement('p');
                    p.innerText = node.textContent.trim();
                    children.push(new Section('default', null, null, plugin.parse(node, options)));
                    return;
                }

                plugin = this.pluginManager.get(extension, version);
                children.push(new Section(extension, version, node.dataset.args, plugin.parse(node, options)));
            });
        }

        // FIXME
        //for (var k = 0; k < children.length - 1; k++) {
        //    if (this.pluginManager.get(children[k].name, children[k].version).join !== true) {
        //        continue;
        //    }
        //    for (var z = k; z < children.length; z++) {
        //        if (children[k].name !== children[z].name || children[k].version !== children[z].version) {
        //            break;
        //        }
        //    }
        //}

        return new Editable(dataset.id, children, field);
    }

    parseable(element, options) {
        return true;
    }
}
