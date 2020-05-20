import { BackendFactory } from 'dnd-core';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BlurGate from '../components/BlurGate';
import Editor from '../Editor';
import { ReduxProvider } from '../reduxConnect';
import { DisplayModes } from '../actions/display';
interface ProviderProps {
  editor: Editor;
  dndBackend?: BackendFactory;
  blurGateDisabled?: boolean;
  blurGateDefaultMode?: DisplayModes;
}

const EditorContext = React.createContext<Editor>(null);

export const useEditor = () => React.useContext<Editor>(EditorContext);

const Provider: React.FC<ProviderProps> = ({
  editor,
  children = [],
  dndBackend = HTML5Backend,
  blurGateDisabled = false,
  blurGateDefaultMode,
}) => (
  <DndProvider backend={dndBackend}>
    <ReduxProvider store={editor.store}>
      <EditorContext.Provider value={editor}>
        <BlurGate disabled={blurGateDisabled} defaultMode={blurGateDefaultMode}>
          {children}
        </BlurGate>
      </EditorContext.Provider>
    </ReduxProvider>
  </DndProvider>
);

export default Provider;
