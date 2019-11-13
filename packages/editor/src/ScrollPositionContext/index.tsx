import React, { MutableRefObject, useCallback, useContext } from 'react';
export const ScrollPositionContext = React.createContext({
  position: 0,
  setPosition: (value: number) => null,
});

export const ScrollPositionProvider = props => {
  const ref: MutableRefObject<number> = React.createRef();
  const setPosition = useCallback(newPos => (ref.current = newPos), []);
  const { Provider } = ScrollPositionContext;
  // this does ot use setState, you have to use request animation frame to poll the value
  return (
    <Provider
      value={{
        setPosition,
        position: ref.current,
      }}
      {...props}
    />
  );
};

export const useSetScrollPosition = () => {
  const { setPosition } = useContext(ScrollPositionContext);
  return setPosition;
};

export const useScrollPosition = callback => {
  const requestRef = React.useRef<number>();
  const { position } = useContext(ScrollPositionContext);
  const animate = () => {
    callback(position);
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};
