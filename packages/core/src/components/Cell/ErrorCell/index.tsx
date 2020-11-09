import * as React from 'react';
import { useIsEditMode, useRemoveCell } from '../../hooks';

const ErrorCell: React.FC<{ nodeId: string; error: Error }> = ({
  nodeId,
  error,
}) => {
  const isEditMode = useIsEditMode();
  const removeCell = useRemoveCell(nodeId);
  return (
    <div className="react-page-cell-error">
      <strong>An error occurred!</strong>
      <small>
        <dl>
          <dt>Cause:</dt>
          <dd>{error.message}</dd>
          <dt>Cell:</dt>
          <dd>{nodeId}</dd>
        </dl>
      </small>
      {isEditMode ? <button onClick={() => removeCell()}>Remove</button> : null}
    </div>
  );
};

export default ErrorCell;
