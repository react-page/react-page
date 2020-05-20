import React, { useEffect } from 'react';
import { blurAllCells } from '../actions/cell';
import {
  setMode as setModeInternal,
  DisplayModes,
  DISPLAY_MODE_EDIT
} from '../actions/display';
import { connect } from '../reduxConnect';
import { createStructuredSelector } from 'reselect';
import { isInsertMode } from '../selector/display';

// this might break in future, but its better than nothing
// tslint:disable-next-line:no-any
function findReactElement(node: any) {
  for (var key in node) {
    if (key.startsWith('__reactInternalInstance$')) {
      return node[key];
    }
  }
  return null;
}

// we go up the reac-tree. This works even through portals, which would not be possible with traversing the dom tree!
const isInSameTree = (parent, child) => {
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

const useBlurAll = (
  blurAllCellsDispatch,
  setMode: (mode: DisplayModes) => void,
  isInInsertMode: boolean,
  defaultMode: DisplayModes = DISPLAY_MODE_EDIT,
  disabled: boolean
) => {
  const ref = React.useRef<HTMLDivElement>();
  useEffect(() => {
    if (disabled) {
      return null;
    }
    if (!ref.current) {
      return null;
    }
    if (!document && !document.body) {
      return null;
    }

    const onMouseDown = (e: MouseEvent) => {
      if (!isInSameTree(ref.current, e.target)) {
        blurAllCellsDispatch();
        // set us in default mode if current mode is "insert"
        if (isInInsertMode) {
          setMode(defaultMode);
        }
      }
    };
    document.body.addEventListener('mousedown', onMouseDown);
    return () => {
      document.body.removeEventListener('mousedown', onMouseDown);
    };
  }, [ref.current, disabled, isInInsertMode]);
  return ref;
};

const mapStateToProps = createStructuredSelector({ isInsertMode });
const mapDispatchToProps = { blurAllCells, setMode: setModeInternal };

export interface BlurGateProps {
  disabled?: boolean;
  defaultMode?: DisplayModes;
}

const BlurGate: React.FC<BlurGateProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  const ref = useBlurAll(
    props.blurAllCells,
    props.setMode,
    props.defaultMode,
    props.isInsertMode,
    props.disabled
  );
  return <div ref={ref}>{props.children}</div>;
});

export default BlurGate;
