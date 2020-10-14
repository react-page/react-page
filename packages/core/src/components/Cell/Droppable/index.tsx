import classNames from 'classnames';
import throttle from 'lodash.throttle';
import * as React from 'react';
import { useDrop } from 'react-dnd';
import { PositionEnum } from '../../../const';
import { CellDrag } from '../../../types/editable';
import {
  useCellPlugin,
  useClearHoverAllNew,
  useClearHoverNew,
  useDropActions,
  useHoverActions,
  useHoverNew,
  useHoverPosition,
  useIsDragging,
  useIsInsertMode,
  useIsLayoutMode,
  useNode,
  useNodeWithAncestors,
  useOptions,
  usePlugins,
} from '../../hooks';
import { onDrop, onHover } from './helper/dnd';

export const useCellDrop = (nodeId: string) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const nodeWithAncestor = useNodeWithAncestors(nodeId);
  const options = useOptions();
  const hoverActions = useHoverActions();
  const hoverNew = useHoverNew();
  const clearHoverNew = useClearHoverNew();
  const clearHoverAllNew = useClearHoverAllNew();
  const dropActions = useDropActions();

  const [collected, dropRef] = useDrop<
    CellDrag,
    void,
    {
      isOver: boolean;
    }
  >({
    accept: 'cell',
    canDrop: (item) => {
      return (
        item.cell.id !== nodeWithAncestor.node.id &&
        !nodeWithAncestor.ancestors.some((a) => a.id === item.cell.id)
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
    hover: throttle(function (item, monitor) {
      if (monitor.isOver({ shallow: true })) {
        const currentCell = ref.current?.getBoundingClientRect();
        const mouse = monitor.getClientOffset();
        if (currentCell && mouse) {
          const offsetX = mouse.x - currentCell.left;
          const offsetY = mouse.y - currentCell.top;
          const halfWidth = currentCell.width / 2;
          const halfHeight = currentCell.height / 2;

          const centerPercentX = Math.abs(offsetX - halfWidth) / halfWidth;
          const centerPercentY = Math.abs(offsetY - halfHeight) / halfHeight;
          const percentX = offsetX / currentCell.width;
          const percentY = offsetY / currentCell.height;
          const position =
            centerPercentX > centerPercentY
              ? percentX < 0.5
                ? PositionEnum.LEFT_OF
                : PositionEnum.RIGHT_OF
              : percentY < 0.5
              ? PositionEnum.ABOVE
              : PositionEnum.BELOW;

          // find ancestors that share this edge

          // if left

          console.log(position, Math.max(centerPercentX, centerPercentY));

          // console.log(nodeWithAncestor.node, nodeWithAncestor.ancestors[1]);
          hoverNew(nodeId, position, Math.max(centerPercentX, centerPercentY));
        }
      }
      // onHover(nodeWithAncestor, monitor, ref.current, hoverActions, options);
    }, 100),
    drop: (item, monitor) => {
      clearHoverAllNew();
      onDrop(nodeWithAncestor, monitor, ref.current, dropActions, options);
    },
  });
  // see https://github.com/react-dnd/react-dnd/issues/1955
  const attach = React.useCallback(
    (domElement: HTMLDivElement) => {
      dropRef(domElement);
      ref.current = domElement;
      // use dom element here for measuring
    },
    [dropRef]
  );
  React.useEffect(() => {
    if (!collected?.isOver) {
      console.log('clear hover');
      clearHoverNew(nodeId);
    }
  }, [clearHoverNew, collected?.isOver]);

  return attach;
};
const Droppable: React.FC<{ nodeId: string; isLeaf?: boolean }> = (props) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const attach = useCellDrop(props.nodeId);

  const options = useOptions();
  if (!(isLayoutMode || isInsertMode) && !options.allowMoveInEditMode) {
    return (
      <div className={'ory-cell-droppable-container'}>{props.children}</div>
    );
  }
  const hoverPosition = useHoverPosition(props.nodeId);

  return (
    <div
      ref={attach}
      className={classNames('ory-cell-droppable', {
        'ory-cell-droppable-is-over-current': hoverPosition,
        [`ory-cell-droppable-is-over-${hoverPosition}`]: hoverPosition,
        'ory-cell-droppable-leaf': props.isLeaf,
      })}
    >
      {props.children}
    </div>
  );
};

export default Droppable;
