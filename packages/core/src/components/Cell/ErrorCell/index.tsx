import * as React from 'react';
import { ComponetizedCell } from '../../../types/editable';

const ErrorCell: React.SFC<ComponetizedCell & { error: Error }> = ({
  id = 'no id given',
  error,
  ...props
}) => (
  <div className="ory-cell-error">
    <strong>An error occurred!</strong>
    <small>
      <dl>
        <dt>Cause:</dt>
        <dd>{error.message}</dd>
        <dt>Cell:</dt>
        <dd>{id}</dd>
      </dl>
    </small>
    {props.isEditMode ? (
      <button onClick={() => props.removeCell()}>Remove</button>
    ) : null}
  </div>
);

export default ErrorCell;
