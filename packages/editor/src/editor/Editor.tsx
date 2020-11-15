import { BackendFactory } from 'dnd-core';

import type { DisplayModes } from '../core/actions/display';

import type { Languages } from '../core/EditorStore';

import type { EditableType, Options } from '../core/types';

import React, { useEffect, useState } from 'react';
import { HTMLRenderer } from '../renderer/HTMLRenderer';
import lazyLoad from '../core/helper/lazyLoad';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  dndBackend?: BackendFactory;
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
    <HTMLRenderer state={value} plugins={plugins} lang={lang} />
  ) : (
    <EditableEditor
      fallback={<HTMLRenderer state={value} plugins={plugins} lang={lang} />}
      pluginsWillChange={pluginsWillChange}
      plugins={plugins}
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
