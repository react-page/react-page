import Editable from 'app/entity/Editable';
import isEmpty from 'lodash/lang/isEmpty';
import Actions from 'app/actions/Editable';

const initialState = {
    type: null,
    render: false,
    data: new Editable()
};

export default (state, action) => {
    if (isEmpty(state)) {
        state = initialState;
    }

    switch (action.type) {
        case Actions.update:
            state = action;
            break;
        default:
            throw 'Action not recognized';
            break;
    }

    return state;
}