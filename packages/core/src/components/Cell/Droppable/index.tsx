import classNames from 'classnames';
import * as React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from '../../../reduxConnect';
import { RootState } from '../../../selector';
import { HoverTarget } from '../../../service/hover/computeHover';
import { CellDrag } from '../../../types/editable';
import { getDropLevels } from '../../../utils/getDropLevels';
import {
  useCellProps,
  useDropActions,
  useHoverActions,
  useIsInsertMode,
  useIsLayoutMode,
  useNodeHoverPosition,
  useOptions,
} from '../../hooks';
import { onDrop, onHover } from './helper/dnd';

export const useCellDrop = (nodeId: string) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const hoverTarget: HoverTarget = useCellProps(nodeId, (node, ancestors) => ({
    id: node.id,
    ancestorIds: ancestors.map((a) => a.id),
    hasInlineNeighbour: node.hasInlineNeighbour,
    inline: node.inline,
    levels: getDropLevels(node, ancestors),
    pluginId: node.plugin?.id,
  }));
  const options = useOptions();
  const hoverActions = useHoverActions();
  const dropActions = useDropActions();
  const hoverPosition = useSelector(
    (state: RootState) => state.reactPage.hover
  );

  const [{ isOver }, dropRef] = useDrop<CellDrag, void, { isOver: boolean }>({
    accept: 'cell',
    canDrop: (item) => {
      return (
        item.cell.id !== nodeId &&
        !hoverTarget?.ancestorIds.includes(item.cell.id)
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      onHover(hoverTarget, monitor, ref.current, hoverActions, options);
    },
    drop: (item, monitor) => {
      onDrop(hoverTarget, monitor, ref.current, dropActions, options);
    },
  });

  React.useEffect(() => {
    if (!isOver && hoverPosition?.nodeId === nodeId) {
      hoverActions.clear();
    }
  }, [isOver, hoverPosition?.nodeId, hoverActions.clear]);

  // see https://github.com/react-dnd/react-dnd/issues/1955
  const attach = React.useCallback(
    (domElement: HTMLDivElement) => {
      dropRef(domElement);
      ref.current = domElement;
      // use dom element here for measuring
    },
    [dropRef]
  );
  return attach;
};
const Droppable: React.FC<{ nodeId: string; isLeaf?: boolean }> = (props) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const attach = useCellDrop(props.nodeId);
  const hoverPosition = useNodeHoverPosition(props.nodeId);
  const options = useOptions();
  if (!(isLayoutMode || isInsertMode) && !options.allowMoveInEditMode) {
    return (
      <div className={'ory-cell-droppable-container'}>{props.children}</div>
    );
  }

  return (
    <div
      ref={attach}
      style={{
        height: '100%',
      }}
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
