import * as React from 'react';
import { defaultHtml5VideoState } from '../default/state';
import { Html5VideoRendererProps } from '../types/renderer';

const Html5VideoHtmlRenderer: React.SFC<Html5VideoRendererProps> = ({
  state: { url = '' } = defaultHtml5VideoState,
}) => {
  return (
    <div className="ory-content-plugin-html5-video">
      <video
        autoPlay={true}
        controls={true}
        loop={true}
        muted={true}
        width="100%"
        key={url}
      >
        <source src={url} type={`video/${url.split('.').pop()}`} />
      </video>
    </div>
  );
};

export default Html5VideoHtmlRenderer;
