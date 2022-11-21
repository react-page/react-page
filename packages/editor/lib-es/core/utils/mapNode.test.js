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
import { mapNode } from './mapNode';
describe('mapNode', function () {
    it('transforms every child row and cell of a node recursivly', function () {
        var node = {
            id: 'cell-1',
            rows: [
                {
                    id: 'row-1',
                    cells: [
                        {
                            id: 'cell-1-1',
                        },
                        {
                            id: 'cell-1-2',
                            rows: [
                                {
                                    id: 'rows-1-2-1',
                                    cells: [
                                        {
                                            id: 'cell-2-1-1',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'row-2',
                    cells: [
                        {
                            id: 'cell-2-1',
                        },
                    ],
                },
            ],
        };
        var mapped = mapNode(node, {
            mapCell: function (c) { return (__assign(__assign({}, c), { size: 6 })); },
            mapRow: function (r) { return (__assign(__assign({}, r), { id: 'mapped-' + r.id })); },
        });
        expect(mapped).toEqual({
            id: 'cell-1',
            size: 6,
            rows: [
                {
                    id: 'mapped-row-1',
                    cells: [
                        {
                            id: 'cell-1-1',
                            size: 6,
                        },
                        {
                            id: 'cell-1-2',
                            size: 6,
                            rows: [
                                {
                                    id: 'mapped-rows-1-2-1',
                                    cells: [
                                        {
                                            id: 'cell-2-1-1',
                                            size: 6,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'mapped-row-2',
                    cells: [
                        {
                            id: 'cell-2-1',
                            size: 6,
                        },
                    ],
                },
            ],
        });
    });
});
//# sourceMappingURL=mapNode.test.js.map