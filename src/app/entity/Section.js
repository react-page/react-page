import uuid from 'app/pkg/uuid';
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
     *      options: {enableTables: true},
     *      data: {innerHTML: '...'}
     * });
     *
     * @param {string} data
     */
    constructor(data) {
        this.uuid = data.uuid;
        this.tid = data.uuid ? '' : uuid();

        this.plugin = data.plugin || '';
        this.version = data.version || '';
        this.options = data.options ? cloneDeep(data.options) : {};
        this.data = data.data ? cloneDeep(data.data) : {};
    }
}
