import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useMeasure } from 'react-use';
import type { Node } from '../../types/node';
import { isRow, Row } from '../../types/node';
import { useCellSpacing, useNodeHoverPosition, useNodeProps } from '../hooks';
import Droppable from './Droppable';
import ResizableRowCell from './ResizableRowCell';

const reduceToIdAndSizeArray = (
  acc: { offset: number; id: string; size: number; maxSize: number }[],
  node: Node,
  index: number,
  array: Node[]
) => {
  const nextNode = array[index + 1];

  const size = isRow(node) ? 12 : node.size;
  const nextSize = !nextNode || isRow(nextNode) ? 0 : nextNode.size;
  const offset = size + (acc[index - 1]?.offset ?? 0);
  return [
    ...acc,
    {
      id: node.id,
      size,
      maxSize: size + nextSize - 1,
      offset,
    },
  ];
};

export interface RowProps {
  nodeId: string;
  className?: string;
}

const Row: React.FC<RowProps> = ({ nodeId, className }) => {
  const [ref, { width: rowWidth }] = useMeasure();

  const hoverPosition = useNodeHoverPosition(nodeId);

  const childrenWithOffsets = useNodeProps(nodeId, (node) =>
    isRow(node)
      ? node.cells?.reduce(reduceToIdAndSizeArray, []) ?? []
      : node.rows?.reduce(reduceToIdAndSizeArray, []) ?? []
  );

  const rowHasInlineChildrenPosition = useNodeProps(
    nodeId,
    (node) => isRow(node) && node.cells.length === 2 && node.cells[0]?.inline
  );

  const { x: cellSpacingX, y: cellSpacingY } = useCellSpacing();

  return (
    <Droppable nodeId={nodeId} className={className}>
      <div
        ref={ref}
        className={classNames('react-page-row', {
          'react-page-row-has-floating-children': Boolean(
            rowHasInlineChildrenPosition
          ),
        })}
        style={{
          position: 'relative',
          margin: cellSpacingX !== 0 ? `0 ${-cellSpacingX / 2}px` : undefined,
        }}
      >
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            top: `${cellSpacingY / 2}px`,
            left: `${cellSpacingX / 2}px`,
            bottom: `${cellSpacingY / 2}px`,
            right: `${cellSpacingX / 2}px`,
          }}
          className={classNames({
            'react-page-row-is-hovering-this': Boolean(hoverPosition),
            [`react-page-row-is-hovering-${hoverPosition || ''}`]: Boolean(
              hoverPosition
            ),
          })}
        />
        {childrenWithOffsets.map(({ offset, id, size, maxSize }, index) => (
          <ResizableRowCell
            key={id}
            isLast={index === childrenWithOffsets.length - 1}
            rowWidth={rowWidth}
            nodeId={id}
            rowHasInlineChildrenPosition={rowHasInlineChildrenPosition}
            offset={offset}
            size={size}
            maxSize={maxSize}
          />
        ))}
      </div>
    </Droppable>
  );
};

export default React.memo(Row);
