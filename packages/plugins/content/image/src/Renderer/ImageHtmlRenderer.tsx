import * as React from 'react';

import { iconStyle } from './../common/styles';
import { CellPluginComponentProps, lazyLoad } from '@react-page/editor';
import { ImageState } from '../types/state';

const ImageIcon = lazyLoad(() => import('@material-ui/icons/Landscape'));

const ImageHtmlRenderer: React.FC<CellPluginComponentProps<ImageState>> = (
  props
) => {
  const { data } = props;

  const src = data?.src;
  const openInNewWindow = data?.openInNewWindow;
  const image = (
    <img className="react-page-plugins-content-image" alt="" src={src} />
  );

  return src ? (
    <div>
      {data?.href ? (
        <a
          onClick={props.isEditMode ? (e) => e.preventDefault() : undefined}
          href={data?.href}
          target={openInNewWindow ? '_blank' : undefined}
          rel={openInNewWindow ? 'noreferrer noopener' : undefined}
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  ) : (
    <div>
      <div className="react-page-plugins-content-image-placeholder">
        <ImageIcon style={iconStyle} />
      </div>
    </div>
  );
};

export default ImageHtmlRenderer;
