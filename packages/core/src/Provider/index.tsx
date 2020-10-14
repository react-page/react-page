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
  ...options
}) => (
  <DndProvider backend={dndBackend}>
    <ReduxProvider store={editor.store}>
      <OptionsContext.Provider value={options}>
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

export default Provider;
