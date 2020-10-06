import Create from '@material-ui/icons/Create';
import { useIsEditMode, useSetEditMode } from '@react-page/core';
import * as React from 'react';
import Button from '../Button/index';

type Props = {
  label: string;
};

const ToggleEdit: React.FC<Props> = ({ label }) => {
  const isEditMode = useIsEditMode();
  const setEditMode = useSetEditMode();
  return (
    <Button
      icon={<Create />}
      description={label}
      active={isEditMode}
      onClick={setEditMode}
    />
  );
};

export default React.memo(ToggleEdit);
