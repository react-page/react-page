import { combineReducers } from 'redux';
import { values } from './values';
import { display } from './display';
import { focus } from './focus';
import { hover } from './hover';
import { settings } from './settings';
var reducer = combineReducers({
    values: values,
    display: display,
    focus: focus,
    settings: settings,
    hover: hover,
    __nodeCache: function () { return null; }, // always empty __nodeCache
});
export { reducer };
export default combineReducers({ reactPage: reducer });
export function initialState(value, lang) {
    return {
        reactPage: {
            __nodeCache: {},
            hover: null,
            focus: null,
            display: {
                mode: 'edit',
                zoom: 1,
            },
            settings: {
                lang: lang,
            },
            values: {
                past: [],
                present: value,
                future: [],
            },
        },
    };
}
//# sourceMappingURL=index.js.map