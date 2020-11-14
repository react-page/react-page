import { CellPluginComponentProps } from '@react-page/editor';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';

import { SpacerState } from '../types/state';

const faintBlack = 'rgba(0, 0, 0, 0.12)';

const SpacerResizable: React.FC<CellPluginComponentProps<SpacerState>> = (
  props
) => {
  const [height, setHeight] = useState(props.data?.height ?? 24);
  useEffect(() => setHeight(props.data?.height), [props.data?.height]);
  const { onChange } = props;
  return (
    <Resizable
      onResize={(e, data) => setHeight(data?.height)}
      onResizeStop={(e, data) =>
        onChange({
          height: data.size.height,
        })
      }
      height={height}
      width={0}
    >
      <div style={{ height: height, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            height: '24px',
            width: '100%',
            background: faintBlack,
            textAlign: 'center',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ color: 'white', width: 24, height: 24 }}
          >
            <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
          </svg>
        </div>
      </div>
    </Resizable>
  );
};

export default SpacerResizable;
