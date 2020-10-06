import Resize from '@material-ui/icons/SettingsOverscan';
import { useIsResizeMode, useSetResizeMode } from '@react-page/core';
import * as React from 'react';
import Button from '../Button/index';

type Props = {
  label: string;
};

const ToggleResize: React.FC<Props> = (props) => {
  const isResizeMode = useIsResizeMode();
  const setResizeMode = useSetResizeMode();
  return (
    <Button
      icon={<Resize />}
      description={props.label}
      active={isResizeMode}
      onClick={setResizeMode}
    />
  );
};

export default React.memo(ToggleResize);
