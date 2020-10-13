import classNames from 'classnames';
import * as React from 'react';
import { useMeasure } from 'react-use';
import { isRow, Row } from '../../types/editable';
import Cell from '../Cell';
import {
  useBlurAllCells,
  useNodeChildrenIds,
  useNodeHoverPosition,
  useNodeProps,
} from '../hooks';
import Droppable from './Droppable';

const Row: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [ref, { width }] = useMeasure();
  const blurAllCells = useBlurAllCells();

  const hoverPosition = useNodeHoverPosition(nodeId);

  const childrenIds = useNodeChildrenIds(nodeId);
  const rowHasInlineChildren = useNodeProps(
    nodeId,
    (node) =>
      isRow(node) && node.cells.length === 2 && Boolean(node.cells[0]?.inline)
  );

  return (
    <Droppable nodeId={nodeId}>
      <div
        ref={ref}
        className={classNames('ory-row', {
          'ory-row-is-hovering-this': Boolean(hoverPosition),
          [`ory-row-is-hovering-${hoverPosition || ''}`]: Boolean(
            hoverPosition
          ),
          'ory-row-has-floating-children': rowHasInlineChildren,
        })}
        onClick={blurAllCells}
      >
        {childrenIds.map((id) => (
          <Cell nodeId={id} rowWidth={width} key={id} />
        ))}
      </div>
    </Droppable>
  );
};

export default React.memo(Row);
