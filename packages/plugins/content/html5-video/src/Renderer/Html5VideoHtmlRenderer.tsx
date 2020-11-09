import { CellPluginComponentProps } from '@react-page/editor';
import * as React from 'react';
import { defaultHtml5VideoState } from '../default/state';
import { Html5VideoState } from '../types/state';

const Html5VideoHtmlRenderer: React.FC<CellPluginComponentProps<
  Html5VideoState
>> = ({ data = defaultHtml5VideoState }) => {
  return (
    <div className="react-page-content-plugin-html5-video">
      <video
        autoPlay={true}
        controls={true}
        loop={true}
        muted={true}
        width="100%"
        key={data?.url}
      >
        <source src={data?.url} type={`video/${data?.url?.split('.').pop()}`} />
      </video>
    </div>
  );
};

export default Html5VideoHtmlRenderer;
