import classNames from 'classnames';
import * as React from 'react';
import { Cell } from '../../types/editable';
import {
  useCell,
  useIsEditMode,
  useIsFocused,
  useIsLayoutMode,
  useIsPreviewMode,
  useIsResizeMode,
  useLang,
  useOptions,
  useResizeCell,
} from '../hooks';
import ErrorCell from './ErrorCell';
import Inner from './Inner';
import Resizable from './Resizable';

const gridClass = ({
  isPreviewMode,
  isEditMode,
  size,
}: {
  isPreviewMode: boolean;
  isEditMode: boolean;
  size: number;
}): string => {
  if (isPreviewMode || isEditMode) {
    return `ory-cell-${isPreviewMode || isEditMode ? 'sm' : 'xs'}-${
      size || 12
    } ory-cell-xs-12`;
  }

  return `ory-cell-xs-${size || 12}`;
};

const stopClick = (_isEditMode: boolean) => (
  e: React.MouseEvent<HTMLDivElement>
) => (_isEditMode ? e.stopPropagation() : null);

const CellErrorGate = class extends React.Component<
  {
    node: Cell;
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
      return <ErrorCell node={this.props.node} error={this.state.error} />;
    }
    return this.props.children;
  }
};

type Props = {
  nodeId: string;
  rowWidth: number;
};
const Cell: React.FC<Props> = ({ nodeId, rowWidth }) => {
  const node = useCell(nodeId);
  const focused = useIsFocused(nodeId);

  const {
    inline,

    hasInlineNeighbour,
    isDraft,
    isDraftI18n,
    size,
    resizable,
  } = node;
  const lang = useLang();
  const isPreviewMode = useIsPreviewMode();
  const isResizeMode = useIsResizeMode();
  const isEditMode = useIsEditMode();
  const isLayoutMode = useIsLayoutMode();
  const { allowResizeInEditMode } = useOptions();

  const resizeCell = useResizeCell(nodeId);

  const isDraftInLang = isDraftI18n?.[lang] ?? isDraft;
  //useWhyDidYouUpdate('cell', { nodeId, rowWidth });
  if (isDraftInLang && isPreviewMode) {
    return null;
  }

  return (
    <div
      className={classNames(
        'ory-cell',
        gridClass({
          isEditMode,
          isPreviewMode,
          size,
        }),
        {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          'ory-cell-focused': focused,
          'ory-cell-is-draft': isDraftInLang,
          'ory-cell-resizing-overlay': isResizeMode,
          'ory-cell-bring-to-front': !isResizeMode && !isLayoutMode && inline, // inline must not be active for resize/layout
        }
      )}
      onClick={stopClick(isEditMode)}
    >
      <CellErrorGate node={node}>
        {resizable && (isResizeMode || allowResizeInEditMode) && rowWidth ? (
          <Resizable
            rowWidth={rowWidth}
            node={node}
            steps={12}
            onChange={resizeCell}
          >
            <Inner nodeId={nodeId} />
          </Resizable>
        ) : (
          <Inner nodeId={nodeId} />
        )}
      </CellErrorGate>
    </div>
  );
};

export default React.memo(Cell);
