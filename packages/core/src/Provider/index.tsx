import { BackendFactory } from 'dnd-core';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlurGate from '../components/BlurGate';
import Editor, { EditorContext } from '../Editor';
import { ReduxProvider } from '../reduxConnect';
import { DisplayModes } from '../actions/display';
import { OptionsContext } from '../components/hooks';
import { Options } from '../types/editable';
import { useMemo } from 'react';

type ProviderProps = {
  editor: Editor;
  dndBackend?: BackendFactory;
  blurGateDisabled?: boolean;
  blurGateDefaultMode?: DisplayModes;
} & Options;

const Provider: React.FC<ProviderProps> = ({
  editor,
  children = [],
  dndBackend = HTML5Backend,
  blurGateDisabled = false,
  blurGateDefaultMode,
  plugins,
  allowMoveInEditMode,
  defaultPlugin,
  allowResizeInEditMode,
  editModeResizeHandle,
  languages,
  pluginsWillChange,
}) => {
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
    pluginsWillChange && defaultPlugin,
    allowMoveInEditMode,
    allowResizeInEditMode,
    editModeResizeHandle,
    languages,
  ]);
  return (
    <DndProvider backend={dndBackend}>
      <ReduxProvider store={editor.store}>
        <OptionsContext.Provider value={optionsMemoized}>
          <EditorContext.Provider value={editor}>
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
