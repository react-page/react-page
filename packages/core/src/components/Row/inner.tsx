import * as React from 'react';
import classNames from 'classnames';

import Cell from '../Cell';
import { ComponetizedRow, SimplifiedModesProps } from '../../types/editable';

const rowHasInlineChildren = ({ cells }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const Inner = ({
  editable,
  ancestors,
  node: { id, hover, cells = [] },
  containerHeight,
  blurAllCells,
  containerWidth,
  allowMoveInEditMode,
  allowResizeInEditMode,
  editModeResizeHandle,
  rawNode,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ComponetizedRow & SimplifiedModesProps & { rawNode: any }) => {
  return (
    <div
      className={classNames('ory-row', {
        'ory-row-is-hovering-this': Boolean(hover),
        [`ory-row-is-hovering-${hover || ''}`]: Boolean(hover),
        'ory-row-has-floating-children': rowHasInlineChildren(rawNode()),
      })}
      onClick={blurAllCells}
    >
      {cells.map((c: string) => (
        <Cell
          rowWidth={containerWidth}
          rowHeight={containerHeight}
          ancestors={[...ancestors, id]}
          editable={editable}
          key={c}
          id={c}
          allowMoveInEditMode={allowMoveInEditMode}
          allowResizeInEditMode={allowResizeInEditMode}
          editModeResizeHandle={editModeResizeHandle}
        />
      ))}
    </div>
  );
};

export default Inner;
