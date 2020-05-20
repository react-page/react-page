import {
  createEmptyState,
  Editable,
  Editor,
  Provider,
  Plugins,
  ContentPluginConfig,
  LayoutPluginConfig,
  DndBackend,
  EditableType
} from '@react-page/core';
import EditorUI from '@react-page/ui';
import React, { useEffect, useRef, useCallback } from 'react';
import StickyWrapper from './StickyWrapper';
import equals from 'fast-deep-equal';
import { SimplifiedModesProps } from '@react-page/core/src/types/editable';

export type EditableEditorProps = {
  plugins?: Plugins;
  defaultPlugin?: ContentPluginConfig | LayoutPluginConfig;
  dndBackend?: DndBackend;
  value?: EditableType;
  onChange?: (v: EditableType) => void;
} & SimplifiedModesProps;

const EditableEditor: React.FC<EditableEditorProps> = ({
  plugins,
  defaultPlugin,
  value,
  onChange,
  dndBackend,
  ...rest
}) => {
  const theValue = value || createEmptyState();
  // tslint:disable-next-line: no-any
  const lastValueRef = useRef<any>();

  const editorRef = useRef(new Editor({ defaultPlugin, plugins }));

  const onChangeCallback = useCallback(
    newValue => {
      lastValueRef.current = newValue;

      onChange(newValue);
    },
    [onChange]
  );

  const equal = equals(theValue, lastValueRef?.current);

  useEffect(() => {
    if (!equal) {
      lastValueRef.current = theValue;
      editorRef.current.trigger.editable.update(theValue);
    }
  }, [equal]);

  const editor = editorRef.current;

  return (
    <Provider editor={editor} dndBackend={dndBackend}>
      <StickyWrapper>
        {stickyNess => (
          <>
            <Editable
              id={lastValueRef.current?.id}
              onChange={onChangeCallback}
              {...rest}
            />
            <EditorUI stickyNess={stickyNess} />
          </>
        )}
      </StickyWrapper>
    </Provider>
  );
};

export default EditableEditor;
