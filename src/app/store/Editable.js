import { createStore } from 'redux';
import reducer from 'app/reducers/Editable';

export default (id) => {
    return createStore(reducer, {data: {id: id}});
}