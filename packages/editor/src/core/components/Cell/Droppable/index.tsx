import classNames from 'classnames';
import * as React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from '../../../reduxConnect';
import { RootState } from '../../../selector';
import { HoverTarget } from '../../../service/hover/computeHover';
import { CellDrag } from '../../../types/editable';
import { getDropLevels } from '../../../utils/getDropLevels';
import {
  useCellPlugin,
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
  const plugin = useCellPlugin(nodeId);
  const options = useOptions();
  const hoverActions = useHoverActions();
  const dropActions = useDropActions();
  const isHoveringOverThis = useSelector(
    (state: RootState) => state.reactPage.hover?.nodeId === nodeId
  );

  const [{ isOver }, dropRef] = useDrop<CellDrag, void, { isOver: boolean }>({
    accept: 'cell',
    canDrop: (item) => {
      if (plugin?.allowNeighbour) {
        if (!plugin.allowNeighbour(item.cell)) {
          return false;
        }
      }
      return (
        item.cell.id !== nodeId &&
        !hoverTarget?.ancestorIds.includes(item.cell.id)
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (plugin?.allowNeighbour) {
        if (!plugin.allowNeighbour(item.cell)) {
          return false;
        }
      }
      onHover(hoverTarget, monitor, ref.current, hoverActions, options);
    },
    drop: (item, monitor) => {
      onDrop(hoverTarget, monitor, ref.current, dropActions, options);
    },
  });

  React.useEffect(() => {
    if (!isOver && isHoveringOverThis) {
      hoverActions.clear();
    }
  }, [isOver, isHoveringOverThis, hoverActions.clear]);

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
      <div className={'react-page-cell-droppable-container'}>
        {props.children}
      </div>
    );
  }

  return (
    <div
      ref={attach}
      style={{
        height: '100%',
      }}
      className={classNames('react-page-cell-droppable', {
        'react-page-cell-droppable-is-over-current': hoverPosition,
        [`react-page-cell-droppable-is-over-${hoverPosition}`]: hoverPosition,
        'react-page-cell-droppable-leaf': props.isLeaf,
      })}
    >
      {props.children}
    </div>
  );
};

export default Droppable;
