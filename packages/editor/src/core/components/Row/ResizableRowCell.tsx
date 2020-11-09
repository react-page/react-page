import React from 'react';
import Draggable from 'react-draggable';
import { useMeasure } from 'react-use';
import Cell from '../Cell';
import {
  useIsPreviewMode,
  useIsResizeMode,
  useOptions,
  useResizeCell,
} from '../hooks';

type Props = {
  nodeId: string;
  rowWidth: number;
  rowHasInlineChildrenPosition: string;
  isLast: boolean;
  offset: number;
  size: number;
  maxSize: number;
};
const ResizableRowCell: React.FC<Props> = ({
  nodeId,
  rowWidth,
  rowHasInlineChildrenPosition,
  isLast,
  offset,
  size,
  maxSize,
}) => {
  const stepWidth = Math.round(rowWidth / 12);
  const { allowResizeInEditMode } = useOptions();
  const isResizeMode = useIsResizeMode();
  const isPreviewMode = useIsPreviewMode();
  const resize = useResizeCell(nodeId);
  const [ref, { height: cellHeight }] = useMeasure();

  const showResizeHandle =
    !isPreviewMode && !isLast && (isResizeMode || allowResizeInEditMode);

  return (
    <>
      <Cell nodeId={nodeId} measureRef={ref} />

      {showResizeHandle ? (
        <Draggable
          bounds={{
            top: 0,
            bottom: 0,
            left: stepWidth,
            right: rowWidth - stepWidth,
          }}
          position={{
            x:
              rowHasInlineChildrenPosition === 'right'
                ? stepWidth * (12 - offset)
                : stepWidth * offset,
            y: 0,
          }}
          axis="x"
          onDrag={(e, data) => {
            const diff = Math.round(data.deltaX / stepWidth);
            const newSize =
              rowHasInlineChildrenPosition === 'right'
                ? size - diff
                : size + diff;
            if (newSize > 0 && newSize <= maxSize) resize(newSize);
          }}
          grid={[stepWidth, 0]}
        >
          <div
            className="resize-handle"
            style={{
              // fix floating style
              height: rowHasInlineChildrenPosition ? cellHeight : 'auto',
            }}
          ></div>
        </Draggable>
      ) : null}
    </>
  );
};

export default React.memo(ResizableRowCell);
