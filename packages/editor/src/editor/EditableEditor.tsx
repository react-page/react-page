import { BackendFactory } from 'dnd-core';
import React from 'react';

import { DisplayModes } from '../core/actions/display';
import Editable from '../core/components/Editable';
import { createEmptyState, Languages } from '../core/EditorStore';
import Provider from '../core/Provider';
import { EditableType, Options } from '../core/types';
import EditorUI from '../ui/EditorUI';
import StickyWrapper from './StickyWrapper';

export type DndBackend = BackendFactory;
export type EditableEditorProps = {
  dndBackend?: DndBackend;
  value?: EditableType;
  onChange?: (v: EditableType) => void;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
  onChangeLang?: (l: string) => void;
  hideEditorSidebar?: boolean;
} & Options;

const EditableEditor: React.FC<EditableEditorProps> = ({
  plugins,
  pluginsWillChange,
  value,
  onChange,
  dndBackend,
  defaultDisplayMode,
  blurGateDisabled,
  lang,
  languages,
  onChangeLang,
  hideEditorSidebar,
  allowMoveInEditMode,
  allowResizeInEditMode,
  editModeResizeHandle,
}) => {
  const theValue = value || createEmptyState();
  return (
    <Provider
      lang={lang}
      onChangeLang={onChangeLang}
      value={[theValue]}
      plugins={plugins}
      allowMoveInEditMode={allowMoveInEditMode}
      allowResizeInEditMode={allowResizeInEditMode}
      editModeResizeHandle={editModeResizeHandle}
      onChange={(e) => onChange(e[0])}
      pluginsWillChange={pluginsWillChange}
      languages={languages}
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      blurGateDefaultMode={defaultDisplayMode}
    >
      <StickyWrapper>
        {(stickyNess) => (
          <>
            <Editable id={theValue.id} />
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
