import type { PropsWithChildren } from 'react';
import React from 'react';

import type { CellPluginMissingProps } from '../../types/plugins';

const PluginMissing: React.FC<PropsWithChildren<CellPluginMissingProps>> = ({
  children,
  ...props
}) => (
  <div>
    <div
      style={{
        backgroundColor: 'red',
        padding: '8px',
        border: '1px solid black',
        margin: '2px',
        overflowX: 'scroll',
      }}
    >
      The requested plugin `{props.pluginId}` could not be found.
      <button onClick={props.remove}>Delete Plugin</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    {children}
  </div>
);

export default PluginMissing;
