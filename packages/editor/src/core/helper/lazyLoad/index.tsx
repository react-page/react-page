import type { ComponentProps, ComponentType, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';

import { lazy, Suspense } from 'react';
import { lazyWithPreload } from 'react-lazy-with-preload';

function useIsServer() {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  return isServer;
}
/**
 *
 * @param factory function that retuns a promise of a component
 * @returns a lazy loaded component. you can pass a fallback to the component that renders on server or when the component is not loaded
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadable = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = lazyWithPreload(factory);

  const LoadableComponent = ({
    fallback = null,
    ...props
  }: ComponentProps<T> & {
    /**
     * render a fallback on server or if the component is not loaded
     */
    fallback?: ReactElement;
  }) => {
    const isServer = useIsServer();
    if (isServer) {
      return fallback ?? null;
    }

    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

  LoadableComponent.load = Component.preload;

  return LoadableComponent;
};

export default loadable;
