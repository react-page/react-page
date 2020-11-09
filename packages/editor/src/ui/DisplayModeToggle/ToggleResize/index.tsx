import Resize from '@material-ui/icons/SettingsOverscan';
import * as React from 'react';
import {
  useIsResizeMode,
  useSetResizeMode,
} from '../../../core/components/hooks';
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
