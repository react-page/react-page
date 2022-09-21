import type { FC, PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import deepEquals from '../utils/deepEquals';
import { OptionsContext } from '../components/hooks';
import { DEFAULT_OPTIONS } from '../defaultOptions';
import type { Options } from '../types';
/*
we memoize the options, so that if you access them, you won't get a fresh object every time.
*/

const OptionsProvider: FC<PropsWithChildren<Options>> = ({
  children,
  ...options
}) => {
  const lastOptions = useRef<Required<Options>>();
  const fullOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const isEqual = lastOptions.current
    ? deepEquals(lastOptions.current, fullOptions)
    : false;
  if (!isEqual) {
    lastOptions.current = fullOptions;
  }

  return lastOptions.current ? (
    <OptionsContext.Provider value={lastOptions.current}>
      {children}
    </OptionsContext.Provider>
  ) : null;
};

export default OptionsProvider;
