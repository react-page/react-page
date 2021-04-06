import type { BackendFactory } from 'dnd-core';
import React, { useEffect, useState } from 'react';
import type { DisplayModes } from '../core/actions/display';
import type { Languages } from '../core/EditorStore';
import lazyLoad from '../core/helper/lazyLoad';
import type { Options, Value, ValueWithLegacy } from '../core/types';
import { HTMLRenderer } from '../renderer/HTMLRenderer';

const EditableEditor = lazyLoad(() => import('./EditableEditor'));

export type EditorProps = {
  /**
   * the current value to display
   */
  value?: ValueWithLegacy | null;
  /**
   * is called when the value has changed.
   * Use this to save the new value
   */
  onChange?: (v: Value) => void;
  /**
   * set readOnly=true if you just want to display the content. This will only load the nesseary code.
   */
  readOnly?: boolean;
  /**
   * all languages that your content can be translated to
   */
  languages?: Languages;

  /**
   * pass the current language of the content
   */
  lang?: string;

  /**
   * is called when the language has changed
   */
  onChangeLang?: (l: string) => void;

  dndBackend?: BackendFactory;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
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
  cellSpacing,
  components,
  ...rest
}) => {
  // mount the component always in readonly, to avoid problems with SSR
  const [renderReadOnly, setRenderReadOnly] = useState(true);
  useEffect(() => {
    setRenderReadOnly(readOnly);
  }, [readOnly]);

  return renderReadOnly ? (
    <HTMLRenderer
      value={value}
      cellPlugins={cellPlugins}
      lang={lang}
      cellSpacing={cellSpacing}
      components={components}
    />
  ) : (
    <EditableEditor
      fallback={
        <HTMLRenderer
          value={value}
          cellPlugins={cellPlugins}
          lang={lang}
          cellSpacing={cellSpacing}
          components={components}
        />
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
      cellSpacing={cellSpacing}
      components={components}
      {...rest}
    />
  );
};

export default Editor;
