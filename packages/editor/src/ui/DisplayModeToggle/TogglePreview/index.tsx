import Devices from '@material-ui/icons/Devices';
import * as React from 'react';
import {
  useIsPreviewMode,
  useSetPreviewMode,
} from '../../../core/components/hooks';
import Button from '../Button/index';

type Props = {
  label: string;
};
const TogglePreview: React.FC<Props> = ({ label }) => {
  const isPreviewMode = useIsPreviewMode();
  const setIsPreviewMode = useSetPreviewMode();
  return (
    <Button
      icon={<Devices />}
      description={label}
      active={isPreviewMode}
      onClick={setIsPreviewMode}
    />
  );
};

export default React.memo(TogglePreview);
