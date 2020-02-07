import equals from 'fast-deep-equal';
import React, { useEffect, useRef } from 'react';
import { useEditor } from '../../Provider';
import { editable } from '../../selector/editable';
import { AbstractCell, AbstractEditable, Row } from '../../types/editable';
import { EditorState } from '../../types/editor';
import HotKeyDecorator from '../HotKey/Decorator';
import Inner from './Inner';

type Serialized = AbstractEditable<AbstractCell<Row>>;

type Props = {
  id: string;
  onChange: (value: Serialized) => void;
};
const Editable: React.FC<Props> = ({ id, onChange }) => {
  const editor = useEditor();
  const previousStateRef = useRef<EditorState>();
  const previousSerializedRef = useRef<Serialized>();
  useEffect(() => {
    const handleChanges = () => {
      const state: EditorState = editable(editor.store.getState(), {
        id: id,
      });
      // prevent uneeded updates

      const isEqual = equals(state, previousStateRef.current);
      if (!state || isEqual) {
        return;
      }
      previousStateRef.current = state;

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
      <Inner id={id} defaultPlugin={editor.defaultPlugin} />
    </HotKeyDecorator>
  );
};

export default React.memo(Editable);
