/**
 * Editable is the model for all editable objects, such as articles or blog posts.
 */
export default class Editable {
    /**
     * Creates a new Editable entity.
     *
     * @example
     * // var sections = [new Section(....
     * var e = new Editable('123', sections, 'title');
     *
     * @param {string} uuid A unique ID to identify this editable area
     * @param {Section[]} sections
     * @param {string} field A field name (compare form fields). E.g. title, description, content. Can be empty.
     */
    constructor(uuid, sections, field) {
        this.uuid = uuid || '';
        this.field = field || '';
        this.sections = sections || [];
    }
}
