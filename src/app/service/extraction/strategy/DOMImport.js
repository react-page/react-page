'use strict';
/**
 * DOMImport is an extraction strategy for transforming a DOM subtree into a normalized data model
 * the editor can work with.
 */
var DOMImport,
    _ = require('underscore'),
    ExtractionException = require('../../../exception/ExtractionException');

/**
 * The DOMImport constructor does not have anything special.
 *
 * @constructor
 */
DOMImport = function() {};

/**
 *
 * @param element
 * @param data
 * @returns {*}
 */
DOMImport.prototype.extract = function(element, data) {
    var dataset = element.dataset;
    data = data || {};
    if (dataset.id === undefined) {
        throw new ExtractionException('Editable object does not have an id');
    }

    _.each(element.children, function() {
        // scan_for_fields
        // scan_for_plugins
        // scan_for_nonspecific_html
    });

    if (element.children.length === 0) {

    }
    return data;
};

DOMImport.prototype.canExtract = function(element, data) {
    try {
        this.extract(element, data);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = DOMImport;