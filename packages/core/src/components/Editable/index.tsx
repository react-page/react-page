import React, { useEffect, useRef } from 'react';
import { serializePluginData } from '../../migrations/serializePluginData';
import { editable } from '../../selector/editable';
import { AbstractEditable, Cell } from '../../types/editable';
import deepEquals from '../../utils/deepEquals';
import { EditableContext, useEditor, useOptions, useSetLang } from '../hooks';
import HotKeyDecorator from '../HotKey/Decorator';
import FallbackDropArea from './FallbackDropArea';
import Inner from './Inner';

type Serialized = AbstractEditable<Cell>;

export type EditableProps = {
  id: string;
  onChange: (value: Serialized) => void;
  lang?: string;
  onChangeLang?: (lang: string) => void;
};
const Editable: React.FC<EditableProps> = ({
  id,
  onChange,
  onChangeLang,
  lang,
}) => {
  const editor = useEditor();
  const options = useOptions();
  const setLang = useSetLang();
  // update lang when changed from outside
  useEffect(() => {
    setLang(lang);
  }, [lang, setLang]);

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
      const state = editable(editor.store.getState(), {
        id: id,
      });

      if (!state) {
        return;
      }
      const serialized = serializePluginData(state, options.plugins);
      const serializedEqual = deepEquals(
        previousSerializedRef.current,
        serialized
      );

      if (serializedEqual) {
        return;
      }
      previousSerializedRef.current = serialized;

      onChange(state);
    };
    const unsubscribe = editor.store.subscribe(handleChanges);
    return () => {
      unsubscribe();
    };
  }, [editor, id, onChange, options.pluginsWillChange && options.plugins]);

  return (
    <EditableContext.Provider value={id}>
      <HotKeyDecorator>
        <FallbackDropArea>
          <Inner id={id} />
        </FallbackDropArea>
      </HotKeyDecorator>
    </EditableContext.Provider>
  );
};

export default React.memo(Editable);
