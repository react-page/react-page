import { useSelector } from '../../reduxConnect';
import { currentValue } from '../../selector/editable';
import deepEquals from '../../utils/deepEquals';
/**
 *
 * @param selector receives the current value node object and returns T
 * @returns the selection T
 */
export var useValueNode = function (selector) {
    return useSelector(function (state) { return selector(currentValue(state)); }, deepEquals);
};
//# sourceMappingURL=value.js.map