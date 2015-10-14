export default {
    appendHTML: function (html, parent) {
        parent = parent || document.body;
        parent.insertAdjacentHTML('beforeend', html);
        return parent.children[parent.children.length - 1];
    }
}
