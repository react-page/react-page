import {
  createEmptyState,
  Editable,
  Editor,
  Provider,
  Plugins,
  ContentPluginConfig,
  LayoutPluginConfig,
  DndBackend,
  EditableType,
  Languages,
  SimplifiedModesProps,
  DisplayModes,
  deepEquals,
} from '@react-page/core';
import EditorUI from '@react-page/ui';
import React, { useEffect, useRef, useCallback } from 'react';

import StickyWrapper from './StickyWrapper';

export type EditableEditorProps = {
  plugins?: Plugins;
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;
  dndBackend?: DndBackend;
  value?: EditableType;
  onChange?: (v: EditableType) => void;
  defaultDisplayMode?: DisplayModes;
  blurGateDisabled?: boolean;
  languages?: Languages;
  lang?: string;
  onChangeLang?: (l: string) => void;
  hideEditorSidebar?: boolean;
} & SimplifiedModesProps;

const EditableEditor: React.FC<EditableEditorProps> = ({
  plugins,
  defaultPlugin,
  value,
  onChange,
  dndBackend,
  defaultDisplayMode,
  blurGateDisabled,
  lang,
  languages,
  onChangeLang,
  hideEditorSidebar,
  ...rest
}) => {
  const theValue = value || createEmptyState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastValueRef = useRef<any>();

  const editorRef = useRef(
    new Editor({ defaultPlugin, plugins, languages, lang })
  );

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
      lastValueRef.current = theValue;
      editorRef.current.update(theValue);
    }
  }, [equal]);
  const editor = editorRef.current;

  return (
    <Provider
      editor={editor}
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
              {...rest}
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
