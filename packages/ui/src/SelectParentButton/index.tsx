import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { useFocusCell, isRow, useNodeProps } from '@react-page/core';
import React from 'react';

const SelectParentButton: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const parentCellId = useNodeProps(
    nodeId,
    (node, ancestors) => ancestors.find((node) => !isRow(node))?.id
  );

  const focusParent = useFocusCell(parentCellId);

  return parentCellId ? (
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
