import {
  ContentPluginConfig,
  DndBackend,
  EditableType,
  LayoutPluginConfig,
  lazyLoad,
  Plugins
} from '@react-page/core';
import { HTMLRenderer } from '@react-page/renderer';
import React from 'react';
import { SimplifiedModesProps } from '@react-page/core/src/types/editable';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  plugins?: Plugins;
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;
  dndBackendd?: DndBackend;
  value?: EditableType;
  onChange?: (v: EditableType) => void;
  readOnly?: boolean;
} & SimplifiedModesProps;
const Editor: React.FC<EditorProps> = ({
  plugins,
  defaultPlugin,
  readOnly,
  value,
  onChange,
  dndBackendd,
  ...rest
}) =>
  readOnly ? (
    <HTMLRenderer state={value} plugins={plugins} />
  ) : (
    <EditableEditor
      plugins={plugins}
      defaultPlugin={defaultPlugin}
      value={value}
      onChange={onChange}
      dndBackend={dndBackendd}
      {...rest}
    />
  );

export default React.memo(Editor);
