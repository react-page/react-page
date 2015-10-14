import cloneDeep from 'lodash/lang/cloneDeep';

/**
 * Section represents a section inside of an editable object.
 */
export default class Section {
    /**
     * Creates a new Section entity.
     *
     * @example
     * var s = new Section({
     *      id: '02912fd7-94c2-4779-b2df-2397e35f5e66'
     *      plugin: 'myPlugin',
     *      version: '1.0',
     *      data: {innerHTML: '...'}
     * });
     *
     * @param {string} data
     */
    constructor(data) {
        data = data || {};
        this.id = data.id || Math.random();

        this.plugin = data.plugin || '';
        this.version = data.version;
        this.data = data.data ? cloneDeep(data.data) : {};
    }
}
