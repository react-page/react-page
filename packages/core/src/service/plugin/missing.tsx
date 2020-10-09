import * as React from 'react';
import {
  PluginBase,
  PluginProps,
  ContentPlugin,
  LayoutPlugin,
} from './classes';

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
  name,
  version,
}: Pick<PluginBase, 'name' | 'version'>): ContentPlugin => ({
  Component: ContentMissingComponent,
  name,
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
  name,
  version,
}: Pick<PluginBase, 'name' | 'version'>): LayoutPlugin => ({
  Component: LayoutMissingComponent,
  name,
  version,
});
