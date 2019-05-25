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
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Editor } from '@react-page/core/lib';
import dragDropContext from '@react-page/core/lib/components/DragDropContext';
import ThemeProvider from '../ThemeProvider/index';

export interface ProviderProps {
  editor: Editor;
}

class Provider extends React.Component<ProviderProps> {
  // tslint:disable-next-line:no-any
  private DragDropContext: any;
  constructor(props: ProviderProps) {
    super(props);
    this.DragDropContext = dragDropContext(props.editor.dragDropContext);
  }

  public render() {
    const { editor, children = [] } = this.props;
    const DragDropContext = this.DragDropContext;
    return (
      <ReduxProvider store={editor.store}>
        <DragDropContext>
          <ThemeProvider>{children}</ThemeProvider>
        </DragDropContext>
      </ReduxProvider>
    );
  }
}

export default Provider;
