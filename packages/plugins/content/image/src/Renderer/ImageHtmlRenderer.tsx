import * as React from 'react';
import { ImageRendererProps } from '../types/renderer';
import { iconStyle } from './../common/styles';
import ImageIcon from '@material-ui/icons/Landscape';

const ImageHtmlRenderer: React.SFC<ImageRendererProps> = props => {
  const { isEditMode, state, imagePreview } = props;
  const src = imagePreview ? imagePreview.dataUrl : state.src;
  const Image = <img className="ory-plugins-content-image" alt=""  style = {{width:state.width+'%', borderRadius:state.borderRadius+'%'}} src={src} />;
  return src ? (
    <div>
      {state.href && !isEditMode ? (
        <a href={state.href} target={state.target} rel={state.rel}>
          {Image}
        </a>
      ) : (
        Image
      )}
    </div>
  ) : (
    <div>
      <div className="ory-plugins-content-image-placeholder">
        <ImageIcon style={iconStyle} />
      </div>
    </div>
  );
};

export default ImageHtmlRenderer;
