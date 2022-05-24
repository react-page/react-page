import IconZoomOut from '@mui/icons-material/ZoomOut';
import IconZoomIn from '@mui/icons-material/ZoomIn';
import React from 'react';
import {
  useCanZoomIn,
  useCanZoomOut,
  useIsSmallScreen,
  useZoomIn,
  useZoomOut,
} from '../../../core/components/hooks';
import Button from '../Button/index';

type Props = {
  labelZoomIn: string;
  labelZoomOut: string;
};

const Zoom: React.FC<Props> = ({ labelZoomIn, labelZoomOut }) => {
  const canZoomIn = useCanZoomIn();
  const canZoomOut = useCanZoomOut();

  const zoomOut = useZoomOut();
  const zoomIn = useZoomIn();

  const isSmall = useIsSmallScreen();

  return (
    <div
      style={{
        height: isSmall ? 56 : 80,
        float: 'right',
        display: 'flex',
        direction: 'ltr',
        transform: 'scale(1.2)',
      }}
    >
      <div
        style={{
          width: isSmall ? 29 : 36,
          overflow: 'hidden',
          marginRight: isSmall ? 1 : 2,
        }}
      >
        <Button
          active
          disabled={!canZoomIn}
          style={{
            transform: `translateX(${isSmall ? 27 : 35}px)`,
          }}
          icon={
            <IconZoomIn
              style={{ transform: `translateX(-${isSmall ? 6 : 12}px)` }}
            />
          }
          description={labelZoomIn}
          onClick={zoomIn}
          activeColor="default"
        />
      </div>
      <div
        style={{
          width: isSmall ? 28 : 36,
          overflow: 'hidden',
          marginLeft: 1,
        }}
      >
        <Button
          style={{
            position: 'relative',
            transform: 'translateX(1px)',
          }}
          active
          disabled={!canZoomOut}
          icon={
            <IconZoomOut
              style={{ transform: `translateX(${isSmall ? 6 : 12}px)` }}
            />
          }
          description={labelZoomOut}
          onClick={zoomOut}
          activeColor="default"
        />
      </div>
    </div>
  );
};

export default React.memo(Zoom);
