import { BackendFactory } from 'dnd-core';

import type { DisplayModes } from '../core/actions/display';

import type { Languages } from '../core/EditorStore';

import type { Value, Options, ValueWithLegacy } from '../core/types';

import React, { useEffect, useState } from 'react';
import { HTMLRenderer } from '../renderer/HTMLRenderer';
import lazyLoad from '../core/helper/lazyLoad';

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
  lang,
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
      {...rest}
    />
  );
};

export default React.memo(Editor);
