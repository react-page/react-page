import React, { useRef } from 'react';
import { useDisplayMode, useZoom } from '../../hooks';
import { useKeepScrollPosition } from '../hooks/useKeepScrollPosition';
import Rows from './Rows';

const Inner: React.FC = () => {
  const mode = useDisplayMode();
  const ref = useRef<HTMLDivElement>(null);
  const zoom = useZoom();
  useKeepScrollPosition(ref);

  const rect = ref.current?.getBoundingClientRect();

  const zoomTransformOriginY = window.innerHeight / 2 - (rect?.top ?? 0);
  const offsetPercent = zoomTransformOriginY / (rect?.height ?? 0);

  const backdropPercent = 50 * (1 - zoom);
  const left = backdropPercent + '%';
  const right = 100 - backdropPercent + '%';
  const top = backdropPercent * offsetPercent * 2 + '%';
  const bottom = 100 - backdropPercent * (1 - offsetPercent) * 2 + '%';
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          opacity: zoom < 1 ? 1 : 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transition: '0.6s',
          clipPath: `polygon(0% 0%, 0% 100%, ${left} 100%, ${left} ${top}, ${right} ${top}, ${right} ${bottom}, ${left} ${bottom}, ${left} 100%, 100% 100%, 100% 0%)`,

          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16  ' viewBox='0 0 8 8'%3E%3Cg fill='%23c5c5c5' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

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
