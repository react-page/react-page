import {
  createEmptyState,
  deepEquals,
  DisplayModes,
  DndBackend,
  Editable,
  EditableType,
  Editor,
  Languages,
  CellPlugin,
  Provider,
} from '@react-page/core';
import { Options } from '@react-page/core/lib/types/editable';
import EditorUI from '@react-page/ui';
import React, { useCallback, useEffect, useRef } from 'react';
import StickyWrapper from './StickyWrapper';

export type EditableEditorProps = {
  defaultPlugin?: CellPlugin;
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
  defaultPlugin,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastValueRef = useRef<any>();

  const editorRef = useRef(new Editor({ plugins, lang }));
  const onChangeCallback = useCallback(
    (newValue) => {
      lastValueRef.current = newValue;
      onChange(newValue);
    },
    [onChange]
  );

  const equal = deepEquals(theValue, lastValueRef?.current);

  useEffect(() => {
    if (!equal) {
      // value from outside has changed
      lastValueRef.current = theValue;
      editorRef.current.update(theValue, { plugins });
    }
  }, [equal]);

  useEffect(() => {
    // plugins from outside have changed, maybe migrations will change the value
    if (equal) editorRef.current.update(theValue, { plugins });
  }, [equal, pluginsWillChange ? plugins : undefined]);
  const editor = editorRef.current;

  return (
    <Provider
      plugins={plugins}
      allowMoveInEditMode={allowMoveInEditMode}
      allowResizeInEditMode={allowResizeInEditMode}
      editModeResizeHandle={editModeResizeHandle}
      editor={editor}
      pluginsWillChange={pluginsWillChange}
      languages={languages}
      dndBackend={dndBackend}
      blurGateDisabled={blurGateDisabled}
      blurGateDefaultMode={defaultDisplayMode}
    >
      <StickyWrapper>
        {(stickyNess) => (
          <>
            <Editable
              lang={lang}
              onChangeLang={onChangeLang}
              id={theValue?.id}
              onChange={onChangeCallback}
            />
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
