/**
 * Section represents a section inside of an editable object.
 */
export default class Section {
    /**
     * Creates a new Section entity.
     *
     * @example
     * var s = new Section('myPlugin', '1.0', {});
     *
     * @param {string} plugin
     * @param {string} version
     * @param {Object} data
     */
    constructor(plugin, version, data) {
        this.plugin = plugin || '';
        this.version = version || '';
        this.data = data;
    }
}
