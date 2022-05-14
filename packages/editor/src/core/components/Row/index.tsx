import classNames from 'classnames';
import React from 'react';
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

  const size = isRow(node) ? 12 : node.size ?? 12;
  const nextSize = !nextNode || isRow(nextNode) ? 0 : nextNode.size ?? 12;
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
const Row: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [ref, { width: rowWidth }] = useMeasure();

  const hoverPosition = useNodeHoverPosition(nodeId);

  const childrenWithOffsets = useNodeProps(nodeId, (node) =>
    isRow(node)
      ? node.cells?.reduce(reduceToIdAndSizeArray, []) ?? []
      : node?.rows?.reduce(reduceToIdAndSizeArray, []) ?? []
  );

  const rowHasInlineChildrenPosition = useNodeProps(
    nodeId,
    (node) =>
      (isRow(node) && node.cells.length === 2 && node.cells[0]?.inline) || null
  );

  const cellSpacing = useCellSpacing();

  return (
    <Droppable nodeId={nodeId}>
      <div
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={classNames('react-page-row', {
          'react-page-row-has-floating-children': Boolean(
            rowHasInlineChildrenPosition
          ),
        })}
        style={{
          position: 'relative',
          margin:
            cellSpacing && cellSpacing.x !== 0
              ? `0 ${-cellSpacing.x / 2}px`
              : undefined,
        }}
      >
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            ...(cellSpacing
              ? {
                  top: `${cellSpacing.y / 2}px`,
                  left: `${cellSpacing.x / 2}px`,
                  bottom: `${cellSpacing.y / 2}px`,
                  right: `${cellSpacing.x / 2}px`,
                }
              : {}),
          }}
          className={classNames({
            'react-page-row-is-hovering-this': Boolean(hoverPosition),
            [`react-page-row-is-hovering-${hoverPosition || ''}`]:
              Boolean(hoverPosition),
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
