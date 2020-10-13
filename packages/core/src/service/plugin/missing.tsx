import * as React from 'react';

import { PluginBase, PluginProps, ContentPlugin, PluginBase } from './classes';

const ContentMissingComponent = (props: PluginProps<unknown>) => (
  <div
    style={{
      backgroundColor: 'red',
      padding: '8px',
      border: '1px solid black',
      margin: '2px',
      overflowX: 'scroll',
    }}
  >
    The requested content plugin could not be found.
    <button onClick={props.remove}>Delete Plugin</button>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

export const contentMissing = ({
  pluginId,
  version,
}: {
  pluginId: string;
  version: string;
}): PluginBase => ({
  Component: ContentMissingComponent,
  id: pluginId,
  version,
});

const LayoutMissingComponent: React.SFC = ({
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
      The requested layout plugin could not be found.
      <button onClick={props.remove}>Delete Plugin</button>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
    {children}
  </div>
);

export const layoutMissing = ({
  pluginId,
  version,
}: {
  pluginId: string;
  version: string;
}): PluginBase => ({
  Component: LayoutMissingComponent,
  id: pluginId,
  version,
});
