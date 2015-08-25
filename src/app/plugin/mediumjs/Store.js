import Reflux from 'reflux';
import Actions from './Actions';
import assign from 'lodash/object/assign';

export default {
    action: Reflux.createStore({
        init () {
            this.state = {triggeredAction: null};
            this.listenTo(Actions.action.triggerAction, this.triggerAction);
        },
        setState (delta) {
            this.state =assign(this.state, delta || {});
            this.trigger(this.state);
        },
        clearAction () {
            this.setState({triggeredAction: null});
        },
        triggerAction (action) {
            this.setState({triggeredAction: action});
        }
    })
}
