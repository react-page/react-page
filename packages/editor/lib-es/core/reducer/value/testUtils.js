import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { value } from './index';
export var simulateDispatch = function (initialState, action) {
    var reducer = combineReducers({ value: value });
    var store = createStore(reducer, { value: initialState }, applyMiddleware(thunk));
    if (action)
        store.dispatch(action);
    return store.getState().value;
};
//# sourceMappingURL=testUtils.js.map