var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Migration } from '@react-page/editor';
import rename from 'deep-rename-keys';
var migration = new Migration({
    toVersion: '0.0.2',
    fromVersionRange: '^0.0.1',
    migrate: function (state) {
        // wrap with document
        state = __assign(__assign({}, state), (state.serialized
            ? { serialized: { document: state.serialized } }
            : {}));
        // rename keys
        state = rename(state, function (key) {
            switch (key) {
                case 'kind':
                    return 'object';
                case 'ranges':
                    return 'leaves';
                default:
                    return key;
            }
        });
        return state;
    },
});
export default migration;
//# sourceMappingURL=v002.js.map