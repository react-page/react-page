import React, { lazy, Suspense } from 'react';
import PlayArrow from '@mui/icons-material/PlayArrow';
import { iconStyle } from '../common/styles';

import type { VideoHtmlRendererProps } from '../types/renderer';

// react player is big, better lazy load it.
const ReactPlayer = lazy(() => import('react-player'));

const Display: React.FC<VideoHtmlRendererProps> = ({ data, readOnly }) =>
  data?.src ? (
    <div style={{ position: 'relative', height: 0, paddingBottom: '65.25%' }}>
      {readOnly ? null : (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
          }}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ReactPlayer
          url={data?.src}
          height="100%"
          width="100%"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </Suspense>
    </div>
  ) : (
    <div className="react-page-plugins-content-video-placeholder">
      <Suspense fallback={<div>Loading...</div>}>
        <PlayArrow style={iconStyle} />
      </Suspense>
    </div>
  );

export default Display;
