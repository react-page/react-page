import IconZoomOut from '@mui/icons-material/ZoomOut';
import IconZoomIn from '@mui/icons-material/ZoomIn';
import React from 'react';
import {
  useCanZoomIn,
  useCanZoomOut,
  useZoomIn,
  useZoomOut,
} from '../../../core/components/hooks';
import Button from '../Button/index';
import Box from '@mui/material/Box/Box';

type Props = {
  labelZoomIn: string;
  labelZoomOut: string;
};

const Zoom: React.FC<Props> = ({ labelZoomIn, labelZoomOut }) => {
  const canZoomIn = useCanZoomIn();
  const canZoomOut = useCanZoomOut();

  const zoomOut = useZoomOut();
  const zoomIn = useZoomIn();

  return (
    <Box
      sx={{
        borderRight: '1px solid #e0e0e0',
      }}
    >
      <Button
        active
        disabled={!canZoomIn}
        icon={<IconZoomIn />}
        description={labelZoomIn}
        onClick={zoomIn}
        activeColor="default"
      />
      <Button
        active
        disabled={!canZoomOut}
        icon={<IconZoomOut />}
        description={labelZoomOut}
        onClick={zoomOut}
        activeColor="default"
      />
    </Box>
  );
};

export default React.memo(Zoom);
