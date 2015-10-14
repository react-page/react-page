import Editable from 'app/entity/Editable';
import isEmpty from 'lodash/lang/isEmpty';
import Actions from 'app/actions/Editable';

const initialState = {
    editable: null,
    model: 'html',
    render: false
};

export default (state, action) => {
    if (isEmpty(state)) {
        state = initialState;
    }

    switch (action.type) {
        case Actions.replace:
            return {...state, render: false};
        case Actions.replaceAndRerender:
            return {...state, render: true};
    }
    return {...state, render: false};
}
