import React from 'react';
import { useIsEditMode, useRemoveCell, useUiTranslator } from '../../hooks';

const ErrorCell: React.FC<{ nodeId: string; error: Error }> = ({
  nodeId,
  error,
}) => {
  const isEditMode = useIsEditMode();
  const removeCell = useRemoveCell(nodeId);
  const { t } = useUiTranslator();
  return (
    <div className="react-page-cell-error">
      <strong>{t('An error occurred!')}</strong>
      <small>
        <dl>
          <dt>{t('Cause:')}</dt>
          <dd>{error.message}</dd>
          <dt>{t('Cell:')}</dt>
          <dd>{nodeId}</dd>
        </dl>
      </small>
      {isEditMode ? (
        <button onClick={() => removeCell()}>{t('Remove')}</button>
      ) : null}
    </div>
  );
};

export default ErrorCell;
