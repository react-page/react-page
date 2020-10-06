import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { useFocusCell, isRow, useNode } from '@react-page/core';
import React from 'react';

const SelectParentButton: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const node = useNode(nodeId);
  const parentCell = [...node.ancestors].reverse().find((node) => !isRow(node));

  const focusParent = useFocusCell(nodeId);

  return parentCell ? (
    <IconButton
      className="bottomToolbar__selectParentButton"
      onClick={() => focusParent()}
      color="default"
      title="Select parent"
    >
      <VerticalAlignTopIcon />
    </IconButton>
  ) : null;
};

export default SelectParentButton;
