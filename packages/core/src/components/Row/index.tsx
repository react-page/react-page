import * as React from 'react';
import Droppable from './Droppable';

import classNames from 'classnames';

import { useMeasure } from 'react-use';
import { Row } from '../../types/editable';
import Cell from '../Cell';
import { useBlurAllCells, useHoverPosition, useRow } from '../hooks';

const rowHasInlineChildren = ({ cells }: Row) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const Row: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [ref, { width }] = useMeasure();
  const node = useRow(nodeId);
  const blurAllCells = useBlurAllCells();
  const hoverPosition = useHoverPosition(nodeId);

  return (
    <Droppable nodeId={nodeId}>
      <div
        ref={ref}
        className={classNames('ory-row', {
          'ory-row-is-hovering-this': Boolean(hoverPosition),
          [`ory-row-is-hovering-${hoverPosition || ''}`]: Boolean(
            hoverPosition
          ),
          'ory-row-has-floating-children': rowHasInlineChildren(node),
        })}
        onClick={blurAllCells}
      >
        {node.cells.map((c) => (
          <Cell nodeId={c.id} rowWidth={width} key={c.id} />
        ))}
      </div>
    </Droppable>
  );
};

export default React.memo(Row);
