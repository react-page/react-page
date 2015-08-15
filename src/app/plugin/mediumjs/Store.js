import Reflux from 'reflux';
import Actions from './Actions';
import u from 'underscore';

export default {
    action: Reflux.createStore({
        init () {
            this.state = {triggeredAction: null};
            this.listenTo(Actions.action.triggerAction, this.triggerAction);
            //this.listenTo(Actions.action.clearAction, this.clearAction);
        },
        setState (delta) {
            this.state = u.extend(this.state, delta || {});
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
