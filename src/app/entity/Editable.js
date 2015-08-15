/**
 * Editable is the model for all editable objects, such as articles or blog posts.
 */
export default class Editable {
    /**
     * Creates a new Editable entity.
     *
     * @example
     * // var sections = [new Section(....
     * var e = new Editable('123', 'title', sections);
     *
     * @param {string} uuid
     * @param {string} field
     * @param {Section[]} sections
     */
    constructor(uuid, field, sections) {
        this.uuid = uuid || '';
        this.field = field || '';
        this.sections = sections || [];
    }
}
