import * as React from 'react';
import { Node } from '../../../types/editable';
import { useIsEditMode, useRemoveCell } from '../../hooks';

const ErrorCell: React.FC<{ node: Node; error: Error }> = ({ node, error }) => {
  const isEditMode = useIsEditMode();
  const removeCell = useRemoveCell(node.id);
  return (
    <div className="ory-cell-error">
      <strong>An error occurred!</strong>
      <small>
        <dl>
          <dt>Cause:</dt>
          <dd>{error.message}</dd>
          <dt>Cell:</dt>
          <dd>{node.id}</dd>
        </dl>
      </small>
      {isEditMode ? <button onClick={() => removeCell()}>Remove</button> : null}
    </div>
  );
};

export default ErrorCell;
