import classNames from 'classnames';
import type { BaseSyntheticEvent } from 'react';
import React, { useCallback } from 'react';
import type { UseMeasureRef } from 'react-use/lib/useMeasure';
import { getCellOuterDivClassName } from '../../utils/getCellStylingProps';
import {
  useAllFocusedNodeIds,
  useCellHasPlugin,
  useCellProps,
  useCellSpacing,
  useIsFocused,
  useIsInsertMode,
  useIsLayoutMode,
  useIsPreviewMode,
  useIsResizeMode,
  useLang,
  useNodeHasChildren,
  useOption,
  useScrollToViewEffect,
  useSetDisplayReferenceNodeId,
} from '../hooks';
import { CellErrorGate } from './CellErrorGate';
import Handle from './Handle';
import Inner from './Inner';
import MoveActions from './MoveActions';
import scrollIntoViewWithOffset from './utils/scrollIntoViewWithOffset';

type Props = {
  nodeId: string;
  measureRef?: UseMeasureRef;
};
const Cell: React.FC<Props> = ({ nodeId, measureRef }) => {
  const focused = useIsFocused(nodeId);

  const { inline, hasInlineNeighbour, isDraft, isDraftI18n, size } =
    useCellProps(nodeId, (node) => {
      return {
        inline: node?.inline,
        hasInlineNeighbour: node?.hasInlineNeighbour,
        isDraft: node?.isDraft,
        isDraftI18n: node?.isDraftI18n,
        size: node?.size ?? 12,
      };
    });

  const lang = useLang();
  const isPreviewMode = useIsPreviewMode();
  const isResizeMode = useIsResizeMode();
  const shouldShowErrorInCells = useOption('shouldShowErrorInCells');
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const multiNodesSelected = useAllFocusedNodeIds().length > 1;
  const hasChildren = useNodeHasChildren(nodeId);
  const showMoveButtons = useOption('showMoveButtonsInLayoutMode');
  const hasPlugin = useCellHasPlugin(nodeId);
  const cellSpacing = useCellSpacing();
  const needVerticalPadding = !hasChildren || hasPlugin;

  const isDraftInLang = isDraftI18n?.[lang] ?? isDraft;
  const ref = React.useRef<HTMLDivElement>(null);

  const setReferenceNodeId = useSetDisplayReferenceNodeId();
  const onClick = useCallback(
    (e: BaseSyntheticEvent) => {
      if (isInsertMode) {
        e.stopPropagation();
        setReferenceNodeId(nodeId);
      }
    },
    [nodeId, isInsertMode, setReferenceNodeId]
  );
  useScrollToViewEffect(
    nodeId,
    () => {
      if (ref.current) scrollIntoViewWithOffset(ref.current, 120); // 120 is just a sane default, we might make int configurable in the future
    },
    [ref.current]
  );
  if (isDraftInLang && isPreviewMode) {
    return null;
  }

  const cellOuterStlye =
    cellSpacing && (cellSpacing.y !== 0 || cellSpacing.x !== 0)
      ? {
          padding: `${needVerticalPadding ? cellSpacing.y / 2 : 0}px ${
            cellSpacing.x / 2
          }px`,
        }
      : undefined;

  return (
    <div
      style={cellOuterStlye}
      ref={ref}
      className={
        getCellOuterDivClassName({
          hasChildren,
          hasInlineNeighbour,
          size,
          inline,
        }) +
        ' ' +
        classNames({
          'react-page-cell-has-plugin': hasPlugin,
          'react-page-cell-focused': focused,
          'react-page-cell-is-draft': isDraftInLang,
          'react-page-cell-bring-to-front':
            !isResizeMode && !isLayoutMode && inline, // inline must not be active for resize/layout
        })
      }
      onClick={onClick}
    >
      <Handle nodeId={nodeId} />
      {showMoveButtons &&
      isLayoutMode &&
      !hasChildren &&
      !multiNodesSelected ? (
        <MoveActions nodeId={nodeId} />
      ) : null}
      <div
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={measureRef as any}
        style={{
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <CellErrorGate nodeId={nodeId} shouldShowError={shouldShowErrorInCells}>
          <Inner nodeId={nodeId} />
        </CellErrorGate>
      </div>
    </div>
  );
};

export default React.memo(Cell);
