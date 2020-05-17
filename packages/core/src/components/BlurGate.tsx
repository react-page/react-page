import React, { useEffect } from "react";
import { blurAllCells } from "../actions/cell";
import { editMode } from "../actions/display";
import { connect } from "../reduxConnect";

// this might break in future, but its better than nothing
// tslint:disable-next-line:no-any
function findReactElement(node: any) {
  for (var key in node) {
    if (key.startsWith("__reactInternalInstance$")) {
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

const useBlurAll = (blurAllCellsDispatch, setEditMode, disabled: boolean) => {
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

    const onMouseDown = (e) => {
      if (!isInSameTree(ref.current, e.target)) {
        blurAllCellsDispatch();
        // always set us in edit mode when blurred
        setEditMode();
      }
    };
    document.body.addEventListener("mousedown", onMouseDown);
    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
    };
  }, [ref.current, disabled]);
  return ref;
};

const mapDispatchToProps = { blurAllCells, editMode };

export interface BlurGateProps {
  disabled?: boolean;
}

const BlurGate: React.FC<BlurGateProps> = connect(
  null,
  mapDispatchToProps
)((props) => {
  const ref = useBlurAll(props.blurAllCells, props.editMode, props.disabled);
  return <div ref={ref}>{props.children}</div>;
});

export default BlurGate;
