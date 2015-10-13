import { createStore } from 'redux';
import reducer from 'app/reducers/Editable';

export default (editable) => {
    return createStore(reducer, {
        editable: editable
    });
}
