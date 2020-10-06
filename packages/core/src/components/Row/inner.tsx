import classNames from 'classnames';
import * as React from 'react';
import { useMeasure } from 'react-use';
import { Row } from '../../types/editable';
import Cell from '../Cell';
import { useBlurAllCells, useRow } from '../hooks';

const rowHasInlineChildren = ({ cells }: Row) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const Inner: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [ref, { width }] = useMeasure();
  const node = useRow(nodeId);
  const blurAllCells = useBlurAllCells();

  return (
    <div
      ref={ref}
      className={classNames('ory-row', {
        'ory-row-is-hovering-this': Boolean(node.hoverPosition),
        [`ory-row-is-hovering-${node.hoverPosition || ''}`]: Boolean(
          node.hoverPosition
        ),
        'ory-row-has-floating-children': rowHasInlineChildren(node),
      })}
      onClick={blurAllCells}
    >
      {node.cells.map((c, index) => (
        <Cell nodeId={c.id} rowWidth={width} key={c.id} />
      ))}
    </div>
  );
};

export default React.memo(Inner);
