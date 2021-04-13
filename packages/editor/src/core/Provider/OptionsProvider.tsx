import React from 'react';
import { OptionsContext } from '../components/hooks';
import type { Options } from '../types';
import { useOptionsMemoized } from './useOptionsMemoized';

const OptionsProvider: React.FC<Options> = ({ children, ...options }) => {
  const optionsMemoized = useOptionsMemoized(options);

  return (
    <OptionsContext.Provider value={optionsMemoized}>
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsProvider;
