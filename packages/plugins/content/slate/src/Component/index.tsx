import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default React.memo((props: any) => {
  const { Controls, Renderer, readOnly } = props;
  // slate controls currently contain everything
  return <>{!readOnly ? <Controls {...props} /> : <Renderer {...props} />}</>;
});
