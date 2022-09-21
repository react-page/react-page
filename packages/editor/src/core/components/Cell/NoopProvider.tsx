import React from 'react';

const NoopProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => <>{children}</>;

export default NoopProvider;
