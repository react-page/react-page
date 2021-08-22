import React, { useRef } from 'react';
import { useDisplayMode, useZoom } from '../../hooks';
import { useKeepScrollPosition } from '../hooks/useKeepScrollPosition';
import Rows from './Rows';

const Inner: React.FC = () => {
  const mode = useDisplayMode();
  const ref = useRef<HTMLDivElement>();
  const zoom = useZoom();
  useKeepScrollPosition(ref);

  const rect = ref.current?.getBoundingClientRect();
  const zoomTransformOriginY = window.innerHeight / 2 - rect?.top;

  return (
    <div ref={ref}>
      <div
        style={{
          transformOrigin: `center ${zoomTransformOriginY}px`,
          transform: `scale(${zoom})`,
          transition: '0.6s',
        }}
        className={'react-page-editable react-page-editable-mode-' + mode}
      >
        <Rows />
      </div>
    </div>
  );
};

export default React.memo(Inner);
