import classNames from 'classnames';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  blurAllCells,
  focusCell,
  resizeCell,
  ResizeCellAction,
} from '../../actions/cell';
import { connect } from '../../reduxConnect';
import { RootState, Selectors } from '../../selector';
import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode,
} from '../../selector/display';
import {
  editableConfig,
  node,
  NodeProps,
  purifiedNode,
} from '../../selector/editable';
import { ComponetizedCell, SimplifiedModesProps } from '../../types/editable';
import {
  BlurAllCellsAction,
  FocusCellAction,
  removeCell,
  RemoveCellAction,
} from './../../actions/cell/core';
import Inner from './Inner';
import Resizable from './Resizable';

const gridClass = ({ node: { size }, ...rest }: ComponetizedCell): string => {
  if (rest.isPreviewMode || rest.isEditMode) {
    return `ory-cell-${rest.isPreviewMode || rest.isEditMode ? 'sm' : 'xs'}-${
      size || 12
    } ory-cell-xs-12`;
  }

  return `ory-cell-xs-${size || 12}`;
};

const stopClick = (_isEditMode: boolean) => (
  e: React.MouseEvent<HTMLDivElement>
) => (_isEditMode ? e.stopPropagation() : null);

type CellProps = ComponetizedCell & SimplifiedModesProps & { lang: string };

class Cell extends React.PureComponent<CellProps> {
  render() {
    const {
      id,
      rowWidth,
      rowHeight,
      updateDimensions,
      lang,
      node: {
        inline,
        resizable,
        hasInlineNeighbour,
        focused,
        isDraft,
        isDraftI18n,
      },
    } = this.props;
    const isDraftInLang = isDraftI18n?.[lang] ?? isDraft;
    if (isDraftInLang && this.props.isPreviewMode) {
      return null;
    }
    return (
      <div
        className={classNames('ory-cell', gridClass(this.props), {
          'ory-cell-has-inline-neighbour': hasInlineNeighbour,
          [`ory-cell-inline-${inline || ''}`]: inline,
          'ory-cell-focused': focused,
          'ory-cell-is-draft': isDraftInLang,
          'ory-cell-resizing-overlay': this.props.isResizeMode,
          'ory-cell-bring-to-front':
            !this.props.isResizeMode && !this.props.isLayoutMode && inline, // inline must not be active for resize/layout
        })}
        onClick={stopClick(this.props.isEditMode)}
      >
        {resizable &&
        (this.props.isResizeMode || this.props.allowResizeInEditMode) &&
        rowWidth ? (
          <Resizable
            {...this.props}
            id={id}
            rowWidth={rowWidth}
            rowHeight={rowHeight}
            updateDimensions={updateDimensions}
            node={this.props.node}
            steps={12}
            onChange={this.props.resizeCell}
          >
            <Inner {...this.props} styles={null} />
          </Resizable>
        ) : (
          <Inner {...this.props} styles={null} />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isPreviewMode,
  isEditMode,
  isResizeMode,
  // required by sub-components
  isInsertMode,
  isLayoutMode,
  config: editableConfig,
  node: purifiedNode,
  lang: Selectors.Setting.getLang,
  rawNode: (state: RootState, props: NodeProps) => () => node(state, props),
});

const mapDispatchToProps = (
  dispatch: Dispatch<
    ResizeCellAction | FocusCellAction | BlurAllCellsAction | RemoveCellAction
  >,
  { id }: { id: string }
) =>
  bindActionCreators(
    {
      resizeCell: resizeCell(id),
      focusCell: focusCell(id),
      blurAllCells,
      removeCell: () => removeCell(id),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch as any
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
