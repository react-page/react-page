import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/Delete';
import { useIsLayoutMode, useTrashDrop } from '@react-page/core';
import classNames from 'classnames';
import * as React from 'react';

const Trash: React.FC = () => {
  const isLayoutMode = useIsLayoutMode();
  const [{ isHovering }, ref] = useTrashDrop();
  return (
    <div
      ref={ref}
      className={classNames('react-page-controls-trash', {
        'react-page-controls-trash-active': isLayoutMode,
      })}
    >
      <Fab color="secondary" disabled={!isHovering}>
        <Delete />
      </Fab>
    </div>
  );
};

export default React.memo(Trash);
