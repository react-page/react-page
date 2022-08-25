import type { CellPluginComponentProps } from '@react-page/editor';

import React, { lazy, Suspense } from 'react';
import type { SpacerState } from '../types/state';

const SpacerResizable = lazy(() => import('./SpacerResizable'));
const SpacerHtmlRenderer: React.FC<CellPluginComponentProps<SpacerState>> = (
  props
) => {
  return (
    <div className={'react-page-plugins-content-spacer'}>
      {props.isEditMode ? (
        <Suspense fallback={<div>Loading...</div>}>
          <SpacerResizable {...props} />
        </Suspense>
      ) : (
        <div style={{ height: `${(props.data?.height || 0).toString()}px` }} />
      )}
    </div>
  );
};

export default SpacerHtmlRenderer;
