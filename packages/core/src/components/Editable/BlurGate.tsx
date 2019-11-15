import React, { useEffect } from 'react';
import { blurAllCells } from '../../actions/cell';
import { connect } from '../../reduxConnect';

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

export const useBlurAll = blurAllCellsDispatch => {
  const ref = React.useRef<HTMLDivElement>();
  useEffect(
    () => {
      if (!ref.current) {
        return null;
      }
      if (!document && !document.body) {
        return null;
      }

      const onMouseDown = e => {
        if (!isInSameTree(ref.current, e.target)) {
          blurAllCellsDispatch();
        }
      };
      document.body.addEventListener('mousedown', onMouseDown);
      return () => {
        document.body.removeEventListener('mousedown', onMouseDown);
      };
    },
    [ref.current]
  );
  return ref;
};

const mapDispatchToProps = { blurAllCells };

const BlurGate = props => {
  const ref = useBlurAll(props.blurAllCells);
  return <div ref={ref}>{props.children}</div>;
};
export default connect(
  null,
  mapDispatchToProps
)(BlurGate);
