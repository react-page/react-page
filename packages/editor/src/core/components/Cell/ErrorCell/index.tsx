import React from 'react';
import { useIsEditMode, useRemoveCell, useUiTranslator } from '../../hooks';

const ErrorCell: React.FC<{
  nodeId: string;
  error: Error;
  resetError?: () => void;
}> = ({ nodeId, error, resetError }) => {
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
        <>
          {resetError ? (
            <button onClick={() => resetError()}>{t('Reset')}</button>
          ) : null}
          <button onClick={() => removeCell()}>{t('Remove')}</button>
        </>
      ) : null}
    </div>
  );
};

export default ErrorCell;
