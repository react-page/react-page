import { BackendFactory } from 'dnd-core';
import React, { useEffect, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlurGate from '../components/BlurGate';
import EditorStore, { EditorContext } from '../EditorStore';
import { ReduxProvider } from '../reduxConnect';
import { DisplayModes, editMode } from '../actions/display';
import { OptionsContext } from '../components/hooks';
import { EditableType, Options } from '../types/editable';

import { serialzeEditable } from '../migrations/serialzeEditable';
import deepEquals from '../utils/deepEquals';
import { RootState } from '../selector';
import { Middleware, Store } from 'redux';
import { migrateEditable } from '../migrations/migrate';
import { updateEditable } from '../actions/editables';

type ProviderProps = {
  lang?: string;
  onChangeLang?: (lang: string) => void;
  value: EditableType[];
  onChange?: (editables: EditableType[]) => void;
  dndBackend?: BackendFactory;
  blurGateDisabled?: boolean;
  blurGateDefaultMode?: DisplayModes;
  /**
   * pass custom redux store:. Might get deprecated in the future
   */
  store?: Store<RootState>;
  /**
   * pass custom redux middleware:. Might get deprecated in the future
   */
  middleware?: Middleware[];
} & Options;

const Provider: React.FC<ProviderProps> = ({
  lang,
  value,
  onChangeLang,
  onChange,
  children = [],
  dndBackend = HTML5Backend,
  blurGateDisabled = false,
  blurGateDefaultMode,
  plugins,
  allowMoveInEditMode,

  allowResizeInEditMode,
  editModeResizeHandle,
  languages,
  pluginsWillChange,
  store: passedStore,
  middleware = [],
}) => {
  const editorStore = useMemo(() => {
    const store = new EditorStore({
      initialState: {
        reactPage: {
          hover: null,
          focus: null,
          display: {
            mode: 'edit',
          },
          settings: {
            lang,
          },
          editables: {
            past: [],
            present: value.map((e) =>
              migrateEditable(e, {
                plugins,
                lang,
              })
            ),
            future: [],
          },
        },
      },
      store: passedStore,
      middleware,
    });
    return store;
  }, [passedStore, ...middleware]);
  const lastValueRef = useRef<EditableType[]>(value);
  useEffect(() => {
    let oldLang = lang;
    const handleChanges = () => {
      // notify outsiders to new language, when chagned in ui
      const newLang = editorStore.store.getState().reactPage.settings.lang;
      if (newLang !== oldLang || newLang !== lang) {
        oldLang = newLang;
        onChangeLang?.(newLang);
      }
      if (!onChange) {
        return;
      }
      //console.time('calculate notifiy on change');
      const editables = editorStore.store.getState().reactPage.editables
        .present;

      if (!editables) {
        // console.timeEnd('calculate notifiy on change');
        return;
      }
      const serializedEditables = editables.map((editable) =>
        serialzeEditable(editable, plugins)
      );
      const serializedEqual = deepEquals(
        lastValueRef.current,
        serializedEditables
      );

      if (serializedEqual) {
        //    console.timeEnd('calculate notifiy on change');
        return;
      }

      lastValueRef.current = serializedEditables;
      //   console.timeEnd('calculate notifiy on change');
      onChange(serializedEditables);
    };
    const unsubscribe = editorStore.store.subscribe(handleChanges);
    return () => {
      unsubscribe();
    };
  }, [editorStore, onChange, pluginsWillChange && plugins]);

  useEffect(() => {
    const equal = deepEquals(value, lastValueRef.current);
    // value changed from outside
    // FIXME: simply this when we no longer allow having multiple editables
    if (!equal) {
      lastValueRef.current = value;
      value.forEach((editable) => {
        const data = migrateEditable(editable, {
          plugins,
          lang,
        });
        editorStore.store.dispatch(updateEditable(data));
      });
    }
  }, [value, pluginsWillChange && plugins, lang]);
  useEffect(() => {
    // if changed from outside
    editorStore.setLang(lang);
  }, [editorStore, lang]);

  useEffect(() => {
    if (value?.length > 1) {
      console.warn(
        'using more than one editable is deprecated. Use a @react-page/editor component for each editable value.'
      );
    }
  }, [value?.length]);
  // prevent options from recreating all the time
  const optionsMemoized: Options = useMemo(() => {
    return {
      plugins,
      pluginsWillChange,
      allowMoveInEditMode,
      allowResizeInEditMode,
      editModeResizeHandle,
      languages,
    };
  }, [
    pluginsWillChange && plugins,
    allowMoveInEditMode,
    allowResizeInEditMode,
    editModeResizeHandle,
    languages,
  ]);

  return (
    <DndProvider backend={dndBackend}>
      <ReduxProvider store={editorStore.store}>
        <OptionsContext.Provider value={optionsMemoized}>
          <EditorContext.Provider value={editorStore}>
            <BlurGate
              disabled={blurGateDisabled}
              defaultMode={blurGateDefaultMode}
            >
              {children}
            </BlurGate>
          </EditorContext.Provider>
        </OptionsContext.Provider>
      </ReduxProvider>
    </DndProvider>
  );
};

export default Provider;
