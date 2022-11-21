import { findSiblingRow } from './findSiblingRow';
describe('findSiblingRow', function () {
    it('returns previous row for a given cell in a simple case', function () {
        var THE_NODE_ID = '1';
        var me = {
            id: THE_NODE_ID,
        };
        var parentRow = {
            id: 'parentRow',
            cells: [me],
        };
        var previousRow = {
            id: 'previousRow',
            cells: [
                {
                    id: 'someother',
                },
            ],
        };
        var prePreviousRow = {
            id: 'prePreviousRow',
            cells: [
                {
                    id: 'something',
                },
            ],
        };
        var nextRow = {
            id: 'nextRow',
            cells: [
                {
                    id: 'nexcell',
                },
            ],
        };
        var greatParentCell = {
            id: 'greatParent',
            rows: [prePreviousRow, previousRow, parentRow, nextRow],
        };
        var ancestors = [parentRow, greatParentCell];
        expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
    });
    it('returns previous row for a given row in a simple case', function () {
        var THE_NODE_ID = '1';
        var me = {
            id: THE_NODE_ID,
            cells: [],
        };
        var previousRow = {
            id: 'previousRow',
            cells: [
                {
                    id: 'someother',
                },
            ],
        };
        var prePreviousRow = {
            id: 'prePreviousRow',
            cells: [
                {
                    id: 'something',
                },
            ],
        };
        var nextRow = {
            id: 'nextRow',
            cells: [
                {
                    id: 'nexcell',
                },
            ],
        };
        var parentCell = {
            id: 'parentCell',
            rows: [prePreviousRow, previousRow, me, nextRow],
        };
        var greatParentRow = {
            id: 'greatParent',
            cells: [parentCell],
        };
        var ancestors = [parentCell, greatParentRow];
        expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
    });
    it('returns previous row for a given cell in a case where parentRow has no previous row, but an other ancestor has', function () {
        var THE_NODE_ID = '1';
        var me = {
            id: THE_NODE_ID,
        };
        var parentRow = {
            id: 'parentRow',
            cells: [me],
        };
        var previousRow = {
            id: 'previousRow',
            cells: [
                {
                    id: 'someother',
                },
            ],
        };
        var prePreviousRow = {
            id: 'prePreviousRow',
            cells: [
                {
                    id: 'something',
                },
            ],
        };
        var nextRow = {
            id: 'nextRow',
            cells: [
                {
                    id: 'nexcell',
                },
            ],
        };
        var greatParentCell = {
            id: 'greatParent',
            rows: [parentRow],
        };
        var greatGreatParentRow = {
            id: 'greatGreatParent',
            cells: [greatParentCell],
        };
        var greatGreatGreatParentCell = {
            id: 'greatGreatGreatParent',
            rows: [prePreviousRow, previousRow, greatGreatParentRow, nextRow],
        };
        var ancestors = [
            parentRow,
            greatParentCell,
            greatGreatParentRow,
            greatGreatGreatParentCell,
        ];
        expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
    });
    it('returns the innermost previous row', function () {
        var THE_NODE_ID = '1';
        var me = {
            id: THE_NODE_ID,
        };
        var prePreviousRow = {
            id: 'prePreviousRow',
            cells: [
                {
                    id: 'something',
                },
            ],
        };
        var nextRow = {
            id: 'nextRow',
            cells: [
                {
                    id: 'nexcell',
                },
            ],
        };
        var previousInnerRow = {
            id: 'previousInnerRow',
            cells: [
                {
                    id: 'someother',
                },
            ],
        };
        var previousInnerCell = {
            id: 'innerCell',
            rows: [prePreviousRow, previousInnerRow],
        };
        var previousRow = {
            id: 'previousRow',
            cells: [previousInnerCell],
        };
        var parentRow = {
            id: 'parentRow',
            cells: [me],
        };
        var greatParentCell = {
            id: 'greatParent',
            rows: [prePreviousRow, previousRow, parentRow, nextRow],
        };
        var ancestors = [parentRow, greatParentCell];
        expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousInnerRow);
    });
});
//# sourceMappingURL=findSiblingRow.test.js.map