import equals from 'fast-deep-equal';
import React, { useEffect, useRef } from 'react';
import { editable } from '../../selector/editable';
import {
  AbstractCell,
  AbstractEditable,
  Row,
  SimplifiedModesProps,
} from '../../types/editable';
import { EditorState } from '../../types/editor';
import { EditableContext, useEditor } from '../hooks';
import HotKeyDecorator from '../HotKey/Decorator';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

type Serialized = AbstractEditable<AbstractCell<Row>>;

export type EditableProps = {
  id: string;
  onChange: (value: Serialized) => void;
  lang?: string;
  onChangeLang?: (lang: string) => void;
} & SimplifiedModesProps;
const Editable: React.FC<EditableProps> = ({
  id,
  onChange,
  onChangeLang,
  lang,
  ...rest
}) => {
  const editor = useEditor();
  // update lang when changed from outside
  useEffect(() => {
    editor.setLang(lang);
  }, [lang]);

  const previousSerializedRef = useRef<Serialized>();
  useEffect(() => {
    let oldLang = lang;
    const handleChanges = () => {
      // notify outsiders to new language, when chagned in ui
      const newLang = editor.store.getState().reactPage.settings.lang;
      if (newLang !== oldLang || newLang !== lang) {
        oldLang = newLang;
        onChangeLang?.(newLang);
      }
      // check also if lang has changed internally, to call callback when controled from outside

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
    <EditableContext.Provider value={id}>
      <HotKeyDecorator id={id}>
        <FallbackDropArea>
          <Inner id={id} defaultPlugin={editor.defaultPlugin} {...rest} />
        </FallbackDropArea>
      </HotKeyDecorator>
    </EditableContext.Provider>
  );
};

export default React.memo(Editable);
