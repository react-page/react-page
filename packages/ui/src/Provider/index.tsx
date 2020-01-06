import { Editor, ReduxProvider } from '@react-page/core';
import { BackendFactory } from 'dnd-core-cjs';
import * as React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import ThemeProvider from '../ThemeProvider/index';
interface ProviderProps {
  editor: Editor;
  dndBackend?: BackendFactory;
}

const EditorContext = React.createContext<Editor>(null);

export const useEditor = () => React.useContext<Editor>(EditorContext);
class Provider extends React.Component<ProviderProps> {
  // tslint:disable-next-line:no-any

  constructor(props: ProviderProps) {
    super(props);
  }

  public render() {
    const { editor, children = [], dndBackend = HTML5Backend } = this.props;
    return (
      <DndProvider backend={dndBackend}>
        <ReduxProvider store={editor.store}>
          <EditorContext.Provider value={editor}>
            <ThemeProvider>{children}</ThemeProvider>
          </EditorContext.Provider>
        </ReduxProvider>
      </DndProvider>
    );
  }
}

export default Provider;
