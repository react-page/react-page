import IconButton from '@material-ui/core/IconButton';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

import React from 'react';
import { useFocusCell, useParentCellId } from '../../core/components/hooks';

const SelectParentButton: React.FC<{
  nodeId: string;
}> = ({ nodeId }) => {
  const parentCellId = useParentCellId(nodeId);

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
