import * as React from 'react';
import { ContentPluginConfig } from './classes';
import { EditorState } from '../../types/editor';
import { PluginProps } from '../..';

const handleChange = (onChange: (state: EditorState) => void) => (
  e: React.ChangeEvent
) => {
  if (e.target instanceof HTMLInputElement) {
    onChange({ value: e.target.value });
  }
};

type Data = { value: string };
const Default: React.SFC<PluginProps<Data>> = ({
  readOnly,
  state: { value },
  onChange,
}) =>
  readOnly ? (
    <div>{value}</div>
  ) : (
    <textarea
      style={{ width: '100%' }}
      value={value}
      onChange={handleChange(onChange)}
    />
  );

const _defaultContentPlugin: ContentPluginConfig<Data> = {
  Component: Default,
  name: 'ory/editor/core/default',

  version: '0.0.1',
  createInitialState: () => ({
    value:
      'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.',
  }),
};

export default _defaultContentPlugin;
