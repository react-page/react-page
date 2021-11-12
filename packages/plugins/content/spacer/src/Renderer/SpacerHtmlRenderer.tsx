import type { CellPluginComponentProps } from '@react-page/editor';
import { lazyLoad } from '@react-page/editor';

import React from 'react';
import type { SpacerState } from '../types/state';

const SpacerResizable = lazyLoad(() => import('./SpacerResizable'));
const SpacerHtmlRenderer: React.FC<CellPluginComponentProps<SpacerState>> = (
  props
) => {
  return (
    <div className={'react-page-plugins-content-spacer'}>
      {props.isEditMode ? (
        <SpacerResizable {...props} />
      ) : (
        <div style={{ height: `${(props.data?.height || 0).toString()}px` }} />
      )}
    </div>
  );
};

export default SpacerHtmlRenderer;
