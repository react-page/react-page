import classNames from 'classnames';
import React, { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from '../../../reduxConnect';

import type { HoverTarget } from '../../../service/hover/computeHover';
import type { RootState } from '../../../types';
import type { CellDrag } from '../../../types/node';
import { getDropLevels } from '../../../utils/getDropLevels';
import {
  usePluginOfCell,
  useCellProps,
  useDropActions,
  useHoverActions,
  useIsInsertMode,
  useIsLayoutMode,
  useNodeHoverPosition,
  useOptions,
  useCellHasPlugin,
  useCellSpacing,
  useAllCellPluginsForNode,
  useCellIsAllowedHere,
} from '../../hooks';
import { onDrop, onHover } from './helper/dnd';

export const useCellDrop = (nodeId: string) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const hoverTarget: HoverTarget = useCellProps(nodeId, (node, ancestors) =>
    node
      ? {
          id: node.id,
          ancestorIds: ancestors.map((a) => a.id),
          hasInlineNeighbour: node.hasInlineNeighbour,
          inline: node.inline,
          levels: getDropLevels(node, ancestors),
          pluginId: node.plugin?.id,
        }
      : null
  );

  const targetParentNodeId = hoverTarget?.ancestorIds?.[0];

  const checkIfAllowed = useCellIsAllowedHere(targetParentNodeId);
  const plugin = usePluginOfCell(nodeId);
  const options = useOptions();
  const hoverActions = useHoverActions();
  const dropActions = useDropActions(targetParentNodeId);
  const isHoveringOverThis = useSelector(
    (state: RootState) => state.reactPage.hover?.nodeId === nodeId
  );

  const [{ isOver, isAllowed }, dropRef] = useDrop<
    CellDrag,
    void,
    { isOver: boolean; isAllowed: boolean }
  >({
    accept: 'cell',
    canDrop: (item) => {
      // check if plugin is allowed here
      if (!checkIfAllowed(item)) {
        return false;
      }
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
      isAllowed: checkIfAllowed(monitor.getItem()),
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

  useEffect(() => {
    if (!isOver && isHoveringOverThis) {
      hoverActions.clear();
    }
  }, [isOver, isHoveringOverThis, hoverActions.clear]);

  // see https://github.com/react-dnd/react-dnd/issues/1955
  const attach = useCallback(
    (domElement: HTMLDivElement) => {
      dropRef(domElement);
      ref.current = domElement;
      // use dom element here for measuring
    },
    [dropRef]
  );
  return [attach, isAllowed] as const;
};
const Droppable: React.FC<{ nodeId: string; isLeaf?: boolean }> = (props) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const [attach, isAllowed] = useCellDrop(props.nodeId);
  const hoverPosition = useNodeHoverPosition(props.nodeId);
  const options = useOptions();
  const hasPlugin = useCellHasPlugin(props.nodeId);
  const { y: cellSpacingY } = useCellSpacing();
  const needVerticalMargin = !props.isLeaf && !hasPlugin;

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
      className="react-page-cell-droppable"
    >
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: needVerticalMargin ? `${cellSpacingY / 2}px` : 0,
          left: 0,
          bottom: needVerticalMargin ? `${cellSpacingY / 2}px` : 0,
          right: 0,
        }}
        className={classNames({
          'react-page-cell-droppable-not-allowed': !isAllowed,
          'react-page-cell-droppable-is-over-current':
            isAllowed && hoverPosition,
          [`react-page-cell-droppable-is-over-${hoverPosition}`]:
            isAllowed && hoverPosition,
          'react-page-cell-droppable-leaf': props.isLeaf,
        })}
      />
      {props.children}
    </div>
  );
};

export default Droppable;
