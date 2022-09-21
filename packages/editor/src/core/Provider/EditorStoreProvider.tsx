import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';
import { updateValue } from '../actions/value';
import {
  useCallbackOption,
  useOption,
  useRenderOption,
} from '../components/hooks';
import EditorStore, { EditorContext } from '../EditorStore';
import { migrateValue } from '../migrations/migrate';
import { serialzeValue } from '../migrations/serialzeValue';
import { initialState } from '../reducer';
import { ReduxProvider } from '../reduxConnect';
import type { ValueWithLegacy } from '../types';
import deepEquals from '../utils/deepEquals';

const EditorStoreProvider: FC<
  PropsWithChildren<{
    lang: string;
    value: ValueWithLegacy | null;
  }>
> = ({ children, lang, value }) => {
  const cellPlugins = useRenderOption('cellPlugins');
  const middleware = useOption('middleware') ?? [];
  const onChangeLang = useCallbackOption('onChangeLang');
  const onChange = useCallbackOption('onChange');
  const storeFromOptions = useOption('store');
  const editorStore = useMemo<EditorStore>(() => {
    const store = new EditorStore({
      initialState: initialState(
        migrateValue(value, {
          cellPlugins,
          lang,
        }),
        lang
      ),
      store: storeFromOptions,
      middleware,
    });
    return store;
  }, [storeFromOptions, ...middleware]);
  const lastValueRef = useRef<ValueWithLegacy | null>(value);
  useEffect(() => {
    let oldLang: string | undefined = lang;
    const handleChanges = () => {
      // notify outsiders to new language, when chagned in ui
      const newLang = editorStore.store.getState().reactPage.settings.lang;
      if (newLang && (newLang !== oldLang || newLang !== lang)) {
        oldLang = newLang;
        onChangeLang?.(newLang);
      }
      if (!onChange) {
        return;
      }
      //console.time('calculate notifiy on change');
      const currentValue =
        editorStore.store.getState().reactPage.values.present;

      if (!currentValue) {
        // console.timeEnd('calculate notifiy on change');
        return;
      }
      const serializedValue = serialzeValue(currentValue, cellPlugins);
      const serializedEqual = deepEquals(lastValueRef.current, serializedValue);

      if (serializedEqual) {
        //    console.timeEnd('calculate notifiy on change');
        return;
      }

      lastValueRef.current = serializedValue;
      //   console.timeEnd('calculate notifiy on change');
      onChange(serializedValue);
    };
    const unsubscribe = editorStore.store.subscribe(handleChanges);
    return () => {
      unsubscribe();
    };
  }, [editorStore, onChange, cellPlugins]);

  useEffect(() => {
    const equal = deepEquals(value, lastValueRef.current);
    // value changed from outside
    if (!equal) {
      lastValueRef.current = value;

      const migratedValue = migrateValue(value, {
        cellPlugins,
        lang,
      });
      editorStore.store.dispatch(updateValue(migratedValue));
    }
  }, [value, cellPlugins, lang]);
  useEffect(() => {
    // if changed from outside
    editorStore.setLang(lang);
  }, [editorStore, lang]);

  return (
    <ReduxProvider store={editorStore.store}>
      <EditorContext.Provider value={editorStore}>
        {children}
      </EditorContext.Provider>
    </ReduxProvider>
  );
};

export default EditorStoreProvider;
