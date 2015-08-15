import u from 'underscore';
import ParserException from'app/exception/ParserException'
import Editable from'app/entity/Editable'
import Section from'app/entity/Section'
import ParsingStrategy from './ParsingStrategy';
import $ from'jquery';

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
        var dataset = element.dataset,
            children = [],
            field = dataset.field || '',
            sections = element.querySelectorAll('[data-section]'),
            editable = new Editable(dataset.id, field);

        if (dataset.id === undefined) {
            // TODO how to ids
            //throw new ParserException('Editable object does not have an id');
            dataset.id = 0;
        }

        if (element.innerHTML.length === 0) {
            var div = document.createElement('div'),
                plugin = this.pluginManager.get('default');
            element.appendChild(div);
            children.push(new Section('default', null, plugin.parse(div, options)));
        } else {
            if (sections.length < 1) {
                $(element).contents().wrap('<div data-section="default"></div>');
                sections = element.querySelectorAll('[data-section]');
            }

            u.each(sections, function (section) {
                var plugin = this.pluginManager.get(section.dataset.section, section.dataset.version),
                    data = plugin.parse(section, options);

                children.push(new Section(section.dataset.section, section.dataset.version, data));
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
