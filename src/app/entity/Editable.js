/**
 * Editable is the model for all editable objects, such as articles or blog posts.
 *
 * @param uuid
 * @param field
 * @param sections
 */
module.exports = function(uuid, field, sections) {
    this.uuid = uuid || '';
    this.field = field || '';
    this.sections = sections || [];
};
