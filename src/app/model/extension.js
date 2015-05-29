var Extension;

Extension = function(id, code) {
    this.id = id;
    this.module = code;
};

module.exports = function(id, code) {
    return new Extension(id, code);
};
