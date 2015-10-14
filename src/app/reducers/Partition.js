import isEmpty from 'lodash/lang/isEmpty';
import Actions from 'app/actions/Partition';
import cloneDeep from 'lodash/lang/cloneDeep';

const initialState = {
    index: 0,
    sections: []
};

export default (state, action) => {
    if (isEmpty(state)) {
        state = initialState;
    }

    switch (action.type) {
        case Actions.replace:
            state.sections = cloneDeep(action.with);
            break;
    }
    return state;
}
