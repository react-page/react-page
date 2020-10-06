import ViewQuilt from '@material-ui/icons/ViewQuilt';
import { useIsLayoutMode, useSetLayoutMode } from '@react-page/core';
import * as React from 'react';
import Button from '../Button';
type Props = {
  label: string;
};

const ToggleLayout: React.FC<Props> = ({ label }) => {
  const isLayoutMode = useIsLayoutMode();
  const setLayoutMode = useSetLayoutMode();
  return (
    <Button
      icon={<ViewQuilt />}
      description={label}
      active={isLayoutMode}
      onClick={setLayoutMode}
    />
  );
};

export default React.memo(ToggleLayout);
