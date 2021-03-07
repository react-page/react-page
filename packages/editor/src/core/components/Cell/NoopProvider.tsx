import React from 'react';

const NoopProvider: React.FC<{ value?: unknown }> = ({ children }) => (
  <>{children}</>
);

export default NoopProvider;
