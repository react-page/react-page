import { generateIds } from './helpers';
export var UPDATE_VALUE = 'UPDATE_VALUE';
export var updateValue = function (value) { return ({
    type: UPDATE_VALUE,
    ts: new Date(),
    value: value,
    ids: generateIds(),
}); };
//# sourceMappingURL=value.js.map