import type { FC, PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import deepEquals from '../utils/deepEquals';
import { CallbacksContext } from '../components/hooks';

import type { Callbacks } from '../types';

const CallbacksProvider: FC<PropsWithChildren<Callbacks>> = ({
  children,
  ...callbacks
}) => {
  const lastCallbacks = useRef<Callbacks>();

  const isEqual = lastCallbacks.current
    ? deepEquals(lastCallbacks.current, callbacks)
    : false;
  if (!isEqual) {
    lastCallbacks.current = callbacks;
  }

  return lastCallbacks.current ? (
    <CallbacksContext.Provider value={lastCallbacks.current}>
      {children}
    </CallbacksContext.Provider>
  ) : null;
};

export default CallbacksProvider;
