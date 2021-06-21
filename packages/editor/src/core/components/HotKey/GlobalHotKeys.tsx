import { useCallback } from 'react';
import { useEffect } from 'react';
import { useFocusedNodeId, useSetInsertMode } from '../hooks';

//For handling the slash key to open cell plugins globally
const GlobalHotKeys = () => {
  const setInsertMode = useSetInsertMode();
  const someCellIsFocused = Boolean(useFocusedNodeId());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!someCellIsFocused && e?.key === '/') {
        setInsertMode();
      }
    },
    [setInsertMode, someCellIsFocused]
  );
  useEffect(() => {
    window?.addEventListener('keydown', handleKeyDown);
    return () => {
      window?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return null;
};

export default GlobalHotKeys;
