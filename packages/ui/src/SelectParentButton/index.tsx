import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import {
  useFocusCell,
  isRow,
  useNode,
  useNodeWithAncestors,
} from '@react-page/core';
import React from 'react';

const SelectParentButton: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const { ancestors } = useNodeWithAncestors(nodeId);
  const parentCell = [...ancestors].reverse().find((node) => !isRow(node));

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
