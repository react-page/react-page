import classNames from 'classnames';
import React, { useCallback } from 'react';
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
import ErrorCell from './ErrorCell';
import Handle from './Handle';
import Inner from './Inner';
import MoveActions from './MoveActions';
import scrollIntoViewWithOffset from './utils/scrollIntoViewWithOffset';

const CellErrorGate = class extends React.Component<
  {
    nodeId: string;
  },
  { error: Error }
> {
  state = {
    error: null,
  };
  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <ErrorCell nodeId={this.props.nodeId} error={this.state.error} />;
    }
    return this.props.children;
  }
};

type Props = {
  nodeId: string;
  measureRef?: React.Ref<HTMLDivElement>;
};
const Cell: React.FC<Props> = ({ nodeId, measureRef }) => {
  const focused = useIsFocused(nodeId);

  const {
    inline,
    hasInlineNeighbour,
    isDraft,
    isDraftI18n,
    size,
  } = useCellProps(
    nodeId,
    ({ inline, hasInlineNeighbour, isDraft, isDraftI18n, size }) => ({
      inline,
      hasInlineNeighbour,
      isDraft,
      isDraftI18n,
      size,
    })
  );

  const lang = useLang();
  const isPreviewMode = useIsPreviewMode();
  const isResizeMode = useIsResizeMode();

  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const multiNodesSelected = useAllFocusedNodeIds().length > 1;
  const hasChildren = useNodeHasChildren(nodeId);
  const showMoveButtons = useOption('showMoveButtonsInLayoutMode');
  const hasPlugin = useCellHasPlugin(nodeId);
  const { x: cellSpacingX, y: cellSpacingY } = useCellSpacing();
  const needVerticalPadding = !hasChildren || hasPlugin;

  const isDraftInLang = isDraftI18n?.[lang] ?? isDraft;
  const ref = React.useRef<HTMLDivElement>();

  const setReferenceNodeId = useSetDisplayReferenceNodeId();
  const onClick = useCallback(
    (e) => {
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
    cellSpacingY !== 0 || cellSpacingX !== 0
      ? {
          padding: `${needVerticalPadding ? cellSpacingY / 2 : 0}px ${
            cellSpacingX / 2
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
        ref={measureRef}
        style={{
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <CellErrorGate nodeId={nodeId}>
          <Inner nodeId={nodeId} />
        </CellErrorGate>
      </div>
    </div>
  );
};

export default React.memo(Cell);
