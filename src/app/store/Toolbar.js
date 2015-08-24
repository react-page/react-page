import Reflux from 'reflux';
import Actions from 'app/Actions';
import u from 'underscore';

export default Reflux.createStore({
    init () {
        this.state = {plugin: {}};
        this.listenTo(Actions.editable.section.focus, this.focusSection);
        this.listenTo(Actions.editable.section.blur, this.blurSection);
    },
    focusSection (plugin, context) {
        this.trigger({
            plugin: plugin,
            context: context
        });
    },
    blurSection () {
        this.trigger({
            plugin: null
        });
    }
});
