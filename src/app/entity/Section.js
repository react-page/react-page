'use strict';
/**
 * Section represents a section inside of an editable object.
 *
 * @param uuid
 * @param plugin
 * @param version
 * @param options
 * @param data
 */
module.exports = function(uuid, plugin, version, options, data) {
    this.uuid = uuid;
    this.plugin = plugin;
    this.version = version;
    this.options = options;
    this.data = data;
};