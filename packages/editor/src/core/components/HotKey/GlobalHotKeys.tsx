import { useCallback } from 'react';
import { useEffect } from 'react';
import isHotkey from 'is-hotkey';
import {
  useBlurAllCells,
  useFocusedNodeId,
  useIsInsertMode,
  useSetEditMode,
  useSetInsertMode,
} from '../hooks';

//For handling the slash key to open cell plugins globally
const GlobalHotKeys = () => {
  const setInsertMode = useSetInsertMode();
  const setEditMode = useSetEditMode();
  const isInsertMode = useIsInsertMode();
  const blurAll = useBlurAllCells();
  const someCellIsFocused = Boolean(useFocusedNodeId());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isHotkey('mod+v', e)) {
        console.log('paste', navigator.clipboard.read());
      }
      if (e.key === 'Escape') {
        if (someCellIsFocused) {
          blurAll();
        }
        if (isInsertMode) {
          setEditMode();
        }
      }
      if (someCellIsFocused && e.key === 'Escape') {
        blurAll();
      } else if (!someCellIsFocused && e?.key === '/') {
        setInsertMode();
      }
    },
    [isInsertMode, setEditMode, setInsertMode, someCellIsFocused, blurAll]
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
