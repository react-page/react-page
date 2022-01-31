import * as React from 'react';

export function useSafeSetState<T>(
  initialState?: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(initialState);

  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeSetState = React.useCallback(
    (args) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState]
  );

  return [state, safeSetState];
}
