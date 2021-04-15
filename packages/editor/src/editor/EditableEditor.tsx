import type { BackendFactory } from 'dnd-core';
import React from 'react';

import type { DisplayModes } from '../core/actions/display';
import Editable from '../core/components/Editable';
import type { Languages } from '../core/EditorStore';
import { createEmptyState } from '../core/EditorStore';
import Provider from '../core/Provider';
import type { Value, Options, ValueWithLegacy } from '../core/types';
import EditorUI from '../ui/EditorUI';
import StickyWrapper from './StickyWrapper';

export type DndBackend = BackendFactory;
export type EditableEditorProps = {
  dndBackend?: DndBackend;
  value?: ValueWithLegacy;
  onChange?: (v: Value) => void;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
  onChangeLang?: (l: string) => void;
  hideEditorSidebar?: boolean;
} & Options;

const EditableEditor: React.FC<EditableEditorProps> = ({
  value,
  onChange,
  dndBackend,
  defaultDisplayMode,
  blurGateDisabled,
  lang,
  languages,
  onChangeLang,
  hideEditorSidebar,
  children,
  ...options
}) => {
  const theValue = value || createEmptyState();
  return (
    <Provider
      lang={lang}
      onChangeLang={onChangeLang}
      value={theValue}
      onChange={onChange}
      languages={languages}
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      blurGateDefaultMode={defaultDisplayMode}
      {...options}
    >
      {children}
      <StickyWrapper>
        {(stickyNess) => (
          <>
            <Editable />
            <EditorUI
              stickyNess={stickyNess}
              hideEditorSidebar={hideEditorSidebar}
            />
          </>
        )}
      </StickyWrapper>
    </Provider>
  );
};

export default EditableEditor;
