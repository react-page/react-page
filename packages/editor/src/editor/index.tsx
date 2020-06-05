import {
  ContentPluginConfig,
  DndBackend,
  EditableType,
  LayoutPluginConfig,
  lazyLoad,
  Plugins,
  Languages,
} from '@react-page/core';
import { HTMLRenderer } from '@react-page/renderer';
import React from 'react';
import { SimplifiedModesProps } from '@react-page/core/src/types/editable';
import { DisplayModes } from '@react-page/core/src/actions/display';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  plugins?: Plugins;
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;
  dndBackend?: DndBackend;
  value?: EditableType | null;
  onChange?: (v: EditableType) => void;
  onChangeLang?: (l: string) => void;
  readOnly?: boolean;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
} & SimplifiedModesProps;

const Editor: React.FC<EditorProps> = ({
  plugins,
  defaultPlugin,
  readOnly,
  value,
  onChange,
  dndBackend,
  blurGateDisabled,
  defaultDisplayMode,
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
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      defaultDisplayMode={defaultDisplayMode}
      {...rest}
    />
  );

export default React.memo(Editor);
