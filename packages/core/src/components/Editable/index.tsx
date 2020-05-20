import equals from 'fast-deep-equal';
import React, { useEffect, useRef } from 'react';
import { useEditor } from '../../Provider';
import { editable } from '../../selector/editable';
import {
  AbstractCell,
  AbstractEditable,
  Row,
  SimplifiedModesProps
} from '../../types/editable';
import { EditorState } from '../../types/editor';
import HotKeyDecorator from '../HotKey/Decorator';
import Inner from './Inner';
type Serialized = AbstractEditable<AbstractCell<Row>>;

export type EditableProps = {
  id: string;
  onChange: (value: Serialized) => void;
} & SimplifiedModesProps;
const Editable: React.FC<EditableProps> = ({ id, onChange, ...rest }) => {
  const editor = useEditor();
  const previousSerializedRef = useRef<Serialized>();
  useEffect(() => {
    const handleChanges = () => {
      const state: EditorState = editable(editor.store.getState(), {
        id: id,
      });

      if (!state) {
        return;
      }
      // prevent uneeded updates
      const serialized = editor.plugins.serialize(state);
      const serializedEqual = equals(previousSerializedRef.current, serialized);

      if (serializedEqual) {
        return;
      }
      previousSerializedRef.current = serialized;
      onChange(serialized);
    };
    const unsubscribe = editor.store.subscribe(handleChanges);
    return () => {
      unsubscribe();
    };
  }, [editor, id, onChange]);

  return (
    <HotKeyDecorator id={id}>
      <Inner id={id} defaultPlugin={editor.defaultPlugin} {...rest} />
    </HotKeyDecorator>
  );
};

export default React.memo(Editable);
