import React, { useEffect, useState } from 'react';
import { Html5VideoProps } from './../types/component';

export interface HTML5VideoState {
  url: string;
}

const HTML5Video: React.FC<Html5VideoProps> = (props: Html5VideoProps) => {
  const { Controls, readOnly, Renderer } = props;

  const [url, setUrl] = useState(props.state.url);
  useEffect(() => {
    setUrl(props.state?.url);
  }, [props.state?.url]);

  return (
    <>
      {!readOnly ? (
        <Controls
          {...props}
          state={{ url }}
          changeUrlPreview={setUrl}
          commitUrl={() => props.onChange({ url })}
        />
      ) : null}
      <Renderer {...props} />
    </>
  );
};

export default React.memo(HTML5Video);
