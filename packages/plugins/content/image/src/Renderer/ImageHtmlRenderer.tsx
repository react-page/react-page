import * as React from 'react';
import { ImageRendererProps } from '../types/renderer';
import { iconStyle } from './../common/styles';
import { lazyLoad } from '@react-page/core';

const ImageIcon = lazyLoad(() => import('@material-ui/icons/Landscape'));

const ImageHtmlRenderer: React.SFC<ImageRendererProps> = (props) => {
  const { data, imagePreview } = props;

  const src = imagePreview ? imagePreview.dataUrl : data?.src;
  const Image = (
    <img className="react-page-plugins-content-image" alt="" src={src} />
  );
  return src ? (
    <div>
      {data?.href && !props.isEditMode ? (
        <a href={data?.href} target={data?.target} rel={data?.rel}>
          {Image}
        </a>
      ) : (
        Image
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
