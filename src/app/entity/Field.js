/**
 * Field represents a field inside of an editable object. A field's concept is most commonly used, because
 * a blog post has a title, a description and content. Each of these parts is one field inside of the editable
 * object.
 *
 * @param uuid
 * @param key
 * @param sections
 */
module.exports = function(uuid, key, sections) {
    this.uuid = uuid;
    this.key = key;
    this.sections = sections;
};
