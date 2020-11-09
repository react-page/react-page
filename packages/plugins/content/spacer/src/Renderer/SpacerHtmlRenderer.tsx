import { CellPluginComponentProps, lazyLoad } from '@react-page/editor';
import classNames from 'classnames';
import * as React from 'react';
import { SpacerState } from '../types/state';
const faintBlack = 'rgba(0, 0, 0, 0.12)';

const SpacerResizable = lazyLoad(() => import('./SpacerResizable'));
const SpacerHtmlRenderer: React.FC<CellPluginComponentProps<SpacerState>> = (
  props
) => {
  return (
    <div
      style={{ border: 'solid 1px', borderColor: faintBlack }}
      className={classNames('react-page-plugins-content-spacer', {
        'react-page-plugins-content-spacer-read-only': props.isPreviewMode,
      })}
    >
      {props.isEditMode ? (
        <SpacerResizable {...props} />
      ) : (
        <div style={{ height: `${(props.data?.height || 0).toString()}px` }} />
      )}
    </div>
  );
};

export default SpacerHtmlRenderer;
