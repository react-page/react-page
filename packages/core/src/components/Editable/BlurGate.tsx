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

export const useBlurAll = (rootElRef, blurAllCellsDispatch) => {
  useEffect(
    () => {
      if (!document && !document.body) {
        return null;
      }

      const onMouseDown = e => {
        if (!isInSameTree(rootElRef.current, e.target)) {
          blurAllCellsDispatch();
        }
      };
      document.body.addEventListener('mousedown', onMouseDown);
      return () => {
        document.body.removeEventListener('mousedown', onMouseDown);
      };
    },
    [rootElRef.current]
  );
};

const mapDispatchToProps = { blurAllCells };

const BlurGate = props => {
  const ref = React.createRef<HTMLDivElement>();
  useBlurAll(ref, props.blurAllCells);
  return <div ref={ref}>{props.children}</div>;
};
export default connect(
  null,
  mapDispatchToProps
)(BlurGate);
