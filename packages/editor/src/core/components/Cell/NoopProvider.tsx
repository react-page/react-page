import React from 'react';

const NoopProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

export default NoopProvider;
