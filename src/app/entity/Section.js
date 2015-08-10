'use strict';
/**
 * Section represents a section inside of an editable object.
 *
 * @param plugin
 * @param version
 * @param options
 * @param data
 */
module.exports = function(plugin, version, data) {
    this.plugin = plugin || '';
    this.version = version || '';
    this.data = data;
};
