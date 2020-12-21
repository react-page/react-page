import type { BackendFactory } from 'dnd-core';
import React, { useEffect, useState } from 'react';
import type { DisplayModes } from '../core/actions/display';
import type { Languages } from '../core/EditorStore';
import lazyLoad from '../core/helper/lazyLoad';
import type { Options, Value, ValueWithLegacy } from '../core/types';
import { HTMLRenderer } from '../renderer/HTMLRenderer';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  dndBackend?: BackendFactory;
  value?: ValueWithLegacy | null;
  onChange?: (v: Value) => void;
  onChangeLang?: (l: string) => void;
  readOnly?: boolean;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
  hideEditorSidebar?: boolean;
} & Options;

const Editor: React.FC<EditorProps> = ({
  cellPlugins,
  readOnly,
  value,
  onChange,
  dndBackend,
  blurGateDisabled,
  defaultDisplayMode,
  languages,
  lang = languages?.[0].lang ?? 'default',
  pluginsWillChange,
  ...rest
}) => {
  // mount the component always in readonly, to avoid problems with SSR
  const [renderReadOnly, setRenderReadOnly] = useState(true);
  useEffect(() => {
    setRenderReadOnly(readOnly);
  }, [readOnly]);

  return renderReadOnly ? (
    <HTMLRenderer state={value} cellPlugins={cellPlugins} lang={lang} />
  ) : (
    <EditableEditor
      fallback={
        <HTMLRenderer state={value} cellPlugins={cellPlugins} lang={lang} />
      }
      pluginsWillChange={pluginsWillChange}
      cellPlugins={cellPlugins}
      value={value}
      onChange={onChange}
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      defaultDisplayMode={defaultDisplayMode}
      lang={lang}
      languages={languages}
      {...rest}
    />
  );
};

export default React.memo(Editor);
