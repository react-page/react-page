import type { FC, PropsWithChildren } from 'react';
import React, { useRef } from 'react';
import deepEquals from '../utils/deepEquals';
import { RenderOptionsContext } from '../components/hooks';
import type { RenderOptions } from '../types';
import { DEFAULT_RENDER_OPTIONS } from '../defaultOptions';
/*
we memoize the RenderOptions, so that if you access them, you won't get a fresh object every time.

*/
const RenderOptionsProvider: FC<PropsWithChildren<RenderOptions>> = ({
  children,
  ...renderOptions
}) => {
  const lastRenderOptions = useRef<Required<RenderOptions>>();
  const fullRenderOptions = {
    ...DEFAULT_RENDER_OPTIONS,
    ...renderOptions,
  };

  const isEqual = lastRenderOptions.current
    ? deepEquals(lastRenderOptions.current, fullRenderOptions)
    : false;
  if (!isEqual) {
    lastRenderOptions.current = fullRenderOptions;
  }

  return lastRenderOptions.current ? (
    <RenderOptionsContext.Provider value={lastRenderOptions.current}>
      {children}
    </RenderOptionsContext.Provider>
  ) : null;
};

export default RenderOptionsProvider;
