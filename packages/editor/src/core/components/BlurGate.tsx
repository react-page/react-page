/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import type { DisplayModes } from '../actions/display';
import { DISPLAY_MODE_EDIT } from '../actions/display';
import {
  useBlurAllCells,
  useIsInsertMode,
  useOption,
  useSetMode,
} from './hooks';

// this might break in future, but its better than nothing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findReactElement(node: any) {
  for (const key in node) {
    if (
      key.startsWith('__reactInternalInstance$') ||
      key.startsWith('__reactFiber$') // react 17
    ) {
      return node[key];
    }
  }
  return null;
}

// we go up the reac-tree. This works even through portals, which would not be possible with traversing the dom tree!
const isInSameTree = (
  parent: Element | null | undefined,
  child: Element | null | undefined
) => {
  if (!parent) {
    return false;
  }
  let element = findReactElement(child);
  while (element) {
    if (element.stateNode === parent) {
      return true;
    }

    element = element.return;
  }
  return false;
};

const useBlurAll = ({
  defaultMode = DISPLAY_MODE_EDIT,
  disabled,
}: {
  defaultMode?: DisplayModes;
  disabled?: boolean;
}) => {
  const ref = React.useRef<HTMLDivElement>();
  const blurAllCells = useBlurAllCells();
  const setMode = useSetMode();
  const isInsertMode = useIsInsertMode();
  useEffect(() => {
    if (disabled) {
      return;
    }
    if (!ref.current) {
      return;
    }
    if (!document && !(document as any).body) {
      return;
    }

    const onMouseDown = (e: MouseEvent) => {
      if (!isInSameTree(ref.current, e.target as any)) {
        blurAllCells();
        // set us in default mode if current mode is "insert"
        if (isInsertMode) {
          setMode(defaultMode);
        }
      }
    };
    document.body.addEventListener('mousedown', onMouseDown);
    return () => {
      document.body.removeEventListener('mousedown', onMouseDown);
    };
  }, [ref.current, disabled, isInsertMode, setMode, blurAllCells]);
  return ref;
};

const BlurGate: FC<PropsWithChildren> = ({ children }) => {
  const defaultMode = useOption('blurGateDefaultMode');
  const disabled = useOption('blurGateDisabled');
  const ref = useBlurAll({ defaultMode, disabled });

  return <div ref={ref as any}>{children}</div>;
};

export default BlurGate;
