/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
import { Editor, ReduxProvider } from '@react-page/core';
import * as React from 'react';
import { DndProvider } from 'react-dnd-cjs';
import HTML5Backend from 'react-dnd-html5-backend-cjs';
import ThemeProvider from '../ThemeProvider/index';

export interface ProviderProps {
  editor: Editor;
}

const EditorContext = React.createContext<Editor>(null);

export const useEditor = () => React.useContext<Editor>(EditorContext);
class Provider extends React.Component<ProviderProps> {
  // tslint:disable-next-line:no-any

  constructor(props: ProviderProps) {
    super(props);
  }

  public render() {
    const { editor, children = [] } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
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
