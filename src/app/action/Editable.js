import Reflux from 'reflux';

export default Reflux.createActions([
    // Focusing the editable (or an editable's section) triggers this.
    'focus',
    // Blurring the editable (or an editable's section) triggers this.
    'blur',
    // Creating a new section triggers this.
    'create',
    // Removing a section triggers this.
    'delete',
    // Is triggered when the editable needs full control over it's sections, this is triggered to deregister all plugins.
    'clear'
]);
