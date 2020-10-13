import * as React from 'react';

import { PluginProps } from '../../service/plugin/classes';

const PluginMissing: React.FC<PluginProps> = ({
  children,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
PluginProps<unknown> & { children: any }) => (
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
      The requested plugin could not be found.
      <button onClick={props.remove}>Delete Plugin</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    {children}
  </div>
);

export default PluginMissing;
