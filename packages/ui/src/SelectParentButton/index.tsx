import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import { useFocusCell, useParentCell } from '@react-page/core';
import React, { useCallback } from 'react';

const SelectParentButton: React.FC<{ id: string }> = ({ id }) => {
  const parentCell = useParentCell(id);

  const focusCell = useFocusCell();

  const onClick = useCallback(() => focusCell(parentCell?.id), [
    parentCell?.id,
  ]);
  return parentCell ? (
    <IconButton
      className="bottomToolbar__selectParentButton"
      onClick={onClick}
      color="default"
      title="Select parent"
    >
      <VerticalAlignTopIcon />
    </IconButton>
  ) : null;
};

export default SelectParentButton;
