import type { Cell, Node, Row } from '../../../types';
import { findSiblingRow } from './findSiblingRow';

describe('findSiblingRow', () => {
  it('returns previous row for a given cell in a simple case', () => {
    const THE_NODE_ID = '1';
    const me: Cell = {
      id: THE_NODE_ID,
    };

    const parentRow: Row = {
      id: 'parentRow',
      cells: [me],
    };
    const previousRow: Row = {
      id: 'previousRow',
      cells: [
        {
          id: 'someother',
        },
      ],
    };
    const prePreviousRow = {
      id: 'prePreviousRow',
      cells: [
        {
          id: 'something',
        },
      ],
    };
    const nextRow = {
      id: 'nextRow',
      cells: [
        {
          id: 'nexcell',
        },
      ],
    };
    const greatParentCell: Cell = {
      id: 'greatParent',
      rows: [prePreviousRow, previousRow, parentRow, nextRow],
    };

    const ancestors: Node[] = [parentRow, greatParentCell];

    expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
  });

  it('returns previous row for a given row in a simple case', () => {
    const THE_NODE_ID = '1';
    const me: Row = {
      id: THE_NODE_ID,
      cells: [],
    };

    const previousRow: Row = {
      id: 'previousRow',
      cells: [
        {
          id: 'someother',
        },
      ],
    };

    const prePreviousRow = {
      id: 'prePreviousRow',
      cells: [
        {
          id: 'something',
        },
      ],
    };
    const nextRow = {
      id: 'nextRow',
      cells: [
        {
          id: 'nexcell',
        },
      ],
    };
    const parentCell: Cell = {
      id: 'parentCell',
      rows: [prePreviousRow, previousRow, me, nextRow],
    };

    const greatParentRow: Row = {
      id: 'greatParent',
      cells: [parentCell],
    };

    const ancestors: Node[] = [parentCell, greatParentRow];

    expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
  });

  it('returns previous row for a given cell in a case where parentRow has no previous row, but an other ancestor has', () => {
    const THE_NODE_ID = '1';
    const me: Cell = {
      id: THE_NODE_ID,
    };

    const parentRow: Row = {
      id: 'parentRow',
      cells: [me],
    };
    const previousRow: Row = {
      id: 'previousRow',
      cells: [
        {
          id: 'someother',
        },
      ],
    };
    const prePreviousRow = {
      id: 'prePreviousRow',
      cells: [
        {
          id: 'something',
        },
      ],
    };
    const nextRow = {
      id: 'nextRow',
      cells: [
        {
          id: 'nexcell',
        },
      ],
    };
    const greatParentCell: Cell = {
      id: 'greatParent',
      rows: [parentRow],
    };

    const greatGreatParentRow: Row = {
      id: 'greatGreatParent',
      cells: [greatParentCell],
    };
    const greatGreatGreatParentCell: Cell = {
      id: 'greatGreatGreatParent',
      rows: [prePreviousRow, previousRow, greatGreatParentRow, nextRow],
    };

    const ancestors: Node[] = [
      parentRow,
      greatParentCell,
      greatGreatParentRow,
      greatGreatGreatParentCell,
    ];

    expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousRow);
  });

  it('returns the innermost previous row', () => {
    const THE_NODE_ID = '1';
    const me: Cell = {
      id: THE_NODE_ID,
    };

    const prePreviousRow = {
      id: 'prePreviousRow',
      cells: [
        {
          id: 'something',
        },
      ],
    };

    const nextRow = {
      id: 'nextRow',
      cells: [
        {
          id: 'nexcell',
        },
      ],
    };

    const previousInnerRow: Row = {
      id: 'previousInnerRow',
      cells: [
        {
          id: 'someother',
        },
      ],
    };
    const previousInnerCell: Cell = {
      id: 'innerCell',
      rows: [prePreviousRow, previousInnerRow],
    };
    const previousRow: Row = {
      id: 'previousRow',
      cells: [previousInnerCell],
    };

    const parentRow: Row = {
      id: 'parentRow',
      cells: [me],
    };

    const greatParentCell: Cell = {
      id: 'greatParent',
      rows: [prePreviousRow, previousRow, parentRow, nextRow],
    };

    const ancestors: Node[] = [parentRow, greatParentCell];

    expect(findSiblingRow(me.id, ancestors, 'previous')).toBe(previousInnerRow);
  });
});
