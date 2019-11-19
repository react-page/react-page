import {
  ContentPluginConfig,
  EditableType,
  LayoutPluginConfig,
  lazyLoad,
  Plugins
} from '@react-page/core';
import { HTMLRenderer } from '@react-page/renderer';
import React from 'react';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

type Props = {
  plugins?: Plugins;
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;
  value?: EditableType;
  onChange?: (v: EditableType) => void;
  readOnly?: boolean;
};
const Editor: React.FC<Props> = ({
  plugins,
  defaultPlugin,
  readOnly,
  value,
  onChange,
}) =>
  readOnly ? (
    <HTMLRenderer state={value} plugins={plugins} />
  ) : (
    <EditableEditor
      plugins={plugins}
      defaultPlugin={defaultPlugin}
      value={value}
      onChange={onChange}
    />
  );

export default React.memo(Editor);
