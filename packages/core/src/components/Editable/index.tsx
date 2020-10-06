import React, { useEffect, useRef } from 'react';
import { editable } from '../../selector/editable';
import {
  AbstractEditable,
  Cell,
  SimplifiedModesProps,
} from '../../types/editable';
import { EditorState } from '../../types/editor';
import deepEquals from '../../utils/deepEquals';
import { EditableContext, OptionsContext, useEditor } from '../hooks';
import HotKeyDecorator from '../HotKey/Decorator';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

type Serialized = AbstractEditable<Cell>;

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

  ...simplifiedModeProps
}) => {
  const editor = useEditor();

  // update lang when changed from outside
  useEffect(() => {
    editor.setLang(lang);
  }, [lang, editor]);

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
      const serializedEqual = deepEquals(
        previousSerializedRef.current,
        serialized
      );

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
    <OptionsContext.Provider value={simplifiedModeProps}>
      <EditableContext.Provider value={id}>
        <HotKeyDecorator>
          <FallbackDropArea>
            <Inner id={id} defaultPlugin={editor.defaultPlugin} />
          </FallbackDropArea>
        </HotKeyDecorator>
      </EditableContext.Provider>
    </OptionsContext.Provider>
  );
};

export default React.memo(Editable);
