import { createId } from '../utils/createId';
export var generateIds = function () {
    return {
        cell: createId(),
        item: createId(),
        others: [createId(), createId(), createId()],
    };
};
//# sourceMappingURL=helpers.js.map