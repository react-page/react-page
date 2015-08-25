import Reflux from 'reflux';
import Actions from 'app/Actions';
import assign from 'lodash/object/assign';

export default Reflux.createStore({
    init () {
        this.state = {lastDraggedPlugin: null};
        this.listenTo(Actions.toolbar.pluginDragBegin, this.pluginDrag);
    },
    setState (delta) {
        this.state = assign(this.state, delta || {});
        this.trigger(this.state);
    },
    pluginDrag (name, version, options) {
        this.setState({
            lastDraggedPlugin: {
                name: name,
                version: version,
                options: options || {}
            }
        });
    }
});
