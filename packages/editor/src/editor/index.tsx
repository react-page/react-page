import {
  DndBackend,
  EditableType,
  PluginBase,
  lazyLoad,
  Plugins,
  Languages,
  DisplayModes,
  SimplifiedModesProps,
} from '@react-page/core';
import { Options } from '@react-page/core/lib/types/editable';
import { HTMLRenderer } from '@react-page/renderer';
import React from 'react';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  defaultPlugin?: PluginBase | PluginBase;
  dndBackend?: DndBackend;
  value?: EditableType | null;
  onChange?: (v: EditableType) => void;
  onChangeLang?: (l: string) => void;
  readOnly?: boolean;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
  hideEditorSidebar?: boolean;
} & Options;

const Editor: React.FC<EditorProps> = ({
  plugins,
  defaultPlugin,
  readOnly,
  value,
  onChange,
  dndBackend,
  blurGateDisabled,
  defaultDisplayMode,
  lang,
  pluginsWillChange,
  ...rest
}) =>
  readOnly ? (
    <HTMLRenderer state={value} plugins={plugins} lang={lang} />
  ) : (
    <EditableEditor
      pluginsWillChange={pluginsWillChange}
      plugins={plugins}
      defaultPlugin={defaultPlugin}
      value={value}
      onChange={onChange}
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      defaultDisplayMode={defaultDisplayMode}
      lang={lang}
      {...rest}
    />
  );

export default React.memo(Editor);
