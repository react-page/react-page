import * as React from 'react';

// we wrap the suspense directly atm
// tslint:disable-next-line:no-any
const withSuspense = (C: any) => (props: any) => (
  <React.Suspense fallback={<div />}>
    <C {...props} />
  </React.Suspense>
);
// tslint:disable-next-line:no-any
export default (loader: any) => withSuspense(React.lazy(loader));
