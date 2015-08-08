var Object = function(id, npmchildren) {
    this.children = children;
    this.id = id;
};

var Partial = function(plugin, inner) {
    this.plugin = 'fallback';
    this.inner = inner;
};

module.exports = Object;