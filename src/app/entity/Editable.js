import forEach from 'lodash/collection/forEach';
import Section from './Section';

/**
 * Editable is the model for all editable objects, such as articles or blog posts.
 */
export default class Editable {
    /**
     * Creates a new Editable entity.
     *
     * @example
     * var sections = [
     *      new Section({
     *          id: '02912fd7-94c2-4779-b2df-2397e35f5e66'
     *          plugin: 'myPlugin',
     *          version: '1.0',
     *          options: {enableTables: true},
     *          data: {innerHTML: '...'}
     *      })
     * ];
     *
     * var editable = new Editable({
     *      id: '02912fd7-94c2-4779-b2df-2397e35f5e66',
     *      field: 'title',
     *      sections: sections
     * });
     *
     * @param {data} data
     */
    constructor(data) {
        data = data || {};
        this.id = data.id || Math.random();
        this.sections = [];
        forEach(data.sections || [], (section) => {
            this.sections.push(new Section(section));
        });
    }
}
