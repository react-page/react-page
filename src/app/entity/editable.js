/**
 * Editable is the model for all editable objects, such as articles or blog posts.
 *
 * @param uuid
 * @param fields
 */
module.exports = function(uuid, fields) {
    this.uuid = uuid;
    this.fields = fields;
};