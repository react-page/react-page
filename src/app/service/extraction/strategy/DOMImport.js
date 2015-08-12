'use strict';
/**
 * DOMImport is an extraction strategy for transforming a DOM subtree into a normalized data model
 * the editor can work with.
 */
var DOMImport, _ = require('underscore'),
    ExtractionException = require('app/exception/ExtractionException'),
    Editable = require('app/entity/Editable'),
    Section = require('app/entity/Section'),
    $ = require('jquery');

/**
 * The DOMImport constructor does not have anything special.
 *
 * @constructor
 */
DOMImport = function (pluginManager) {
    this.pluginManager = pluginManager;
};

/**
 *
 * @param element
 * @param data
 * @param options
 * @returns {*}
 */
DOMImport.prototype.extract = function (element, data, options) {
    var dataset = element.dataset,
        children = [],
        field = dataset.field || '',
        sections = element.querySelectorAll('[data-section]'),
        editable = new Editable(dataset.id, field);

    if (dataset.id === undefined) {
        // TODO how to ids
        //throw new ExtractionException('Editable object does not have an id');
        dataset.id = 0;
    }

    if (element.innerHTML.length === 0) {
        var div = document.createElement('div'),
            plugin = this.pluginManager.get('fallback', null);
        element.appendChild(div);
        extract(dataset.id, 1, div);
        children.push(new Section('fallback', null, plugin.extract(dataset.id || 1, 1, div, options)));
    } else {
        if (sections.length < 1) {
            $(element).contents().wrap('<div data-section="fallback"></div>');
            sections = element.querySelectorAll('[data-section]');
        }

        _.each(sections, function (section, i) {
            var extracted = this.pluginManager.get(section.dataset.section, section.dataset.version).extract(dataset.id, i, section, options);
            children.push(new Section(section.dataset.section, section.dataset.version, extracted));
        }.bind(this));
    }
    editable.sections = children;

    return editable;
};

DOMImport.prototype.canExtract = function (element, data) {
    try {
        this.extract(element, data);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = DOMImport;
