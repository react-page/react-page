import * as React from 'react';

// tslint:disable-next-line:no-any
export default React.memo((props: any) => {
  const { Controls, Renderer, readOnly } = props;
  // slate controls currently contain everything
  return <>{!readOnly ? <Controls {...props} /> : <Renderer {...props} />}</>;
});
