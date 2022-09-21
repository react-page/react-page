import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from '../../../reduxConnect';
import type { RootState } from '../../../types';
import type { CellDrag } from '../../../types/node';
import {
  useNodeAsHoverTarget,
  useCellHasPlugin,
  useCellIsAllowedHere,
  useCellSpacing,
  useDropActions,
  useHoverActions,
  useIsInsertMode,
  useIsLayoutMode,
  useNodeHoverPosition,
  usePluginOfCell,
  useOption,
  useAllCellPluginsForNode,
} from '../../hooks';
import { onDrop, onHover } from './helper/dnd';

export const useCellDrop = (nodeId: string) => {
  const ref = React.useRef<HTMLDivElement>();

  const hoverTarget = useNodeAsHoverTarget(nodeId);

  const targetParentNodeId = hoverTarget?.ancestorIds?.[0];

  const checkIfAllowed = useCellIsAllowedHere(targetParentNodeId);
  const plugin = usePluginOfCell(nodeId);

  const cellPlugins = useAllCellPluginsForNode(targetParentNodeId);
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
      if (!item.cell) {
        return false;
      }
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
        !(item.cell.id && hoverTarget?.ancestorIds?.includes(item.cell.id))
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isAllowed: checkIfAllowed(monitor.getItem()),
    }),
    hover(item, monitor) {
      if (!item.cell || !hoverTarget || !ref.current) {
        return false;
      }
      if (plugin?.allowNeighbour) {
        if (!plugin.allowNeighbour(item.cell)) {
          return false;
        }
      }
      onHover(hoverTarget, monitor, ref.current, hoverActions, cellPlugins);
    },
    drop: (item, monitor) => {
      if (!hoverTarget || !ref.current) {
        return;
      }
      onDrop(hoverTarget, monitor, ref.current, dropActions, cellPlugins);
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
const Droppable: FC<PropsWithChildren<{ nodeId: string; isLeaf?: boolean }>> = (
  props
) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const [attach, isAllowed] = useCellDrop(props.nodeId);
  const hoverPosition = useNodeHoverPosition(props.nodeId);
  const allowMoveInEditMode = useOption('allowMoveInEditMode');
  const hasPlugin = useCellHasPlugin(props.nodeId);
  const { y: cellSpacingY } = useCellSpacing() ?? { y: 0 };
  const needVerticalMargin = !props.isLeaf && !hasPlugin;

  if (!(isLayoutMode || isInsertMode) && !allowMoveInEditMode) {
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
