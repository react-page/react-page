import * as React from 'react';
import { CellPlugin } from './classes';
import { CellPluginComponentProps } from '../..';

type Data = {
  value: string;
};
const Default: React.SFC<CellPluginComponentProps<Data>> = ({
  readOnly,
  data: { value },
  onChange,
}) =>
  readOnly ? (
    <div>{value}</div>
  ) : (
    <textarea
      style={{ width: '100%' }}
      value={value}
      onChange={(e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
          onChange({ value: e.target.value });
        }
      }}
    />
  );

const _defaultContentPlugin: CellPlugin<Data> = {
  Component: Default,
  id: 'ory/editor/core/default',

  version: '0.0.1',
  createInitialState: () => ({
    value:
      'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.',
  }),
};

export default _defaultContentPlugin;
