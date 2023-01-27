import React from 'react';

export const ConditionalWrapper: React.FC<{
  condition: boolean;
  children: React.ReactElement;
  wrapper: (children: React.ReactElement) => React.ReactElement;
}> = ({ condition, wrapper, children }) => (
  <>{condition ? wrapper(children) : children}</>
);
