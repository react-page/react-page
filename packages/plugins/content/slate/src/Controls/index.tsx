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

import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { Portal } from 'react-portal';
import isHotkey from 'is-hotkey';
import { NextType } from '../types/next';
import { Editor, getEventTransfer } from 'slate-react';
import { BottomToolbar, ThemeProvider } from '@react-page/ui';
import debounce from 'lodash.debounce';

import { Value, Editor as CoreEditor } from 'slate';

import { SlateProps } from 'src/types/component';
import Plugin, { PluginButtonProps } from 'src/plugins/Plugin';

interface Cancelable {
  cancel(): void;
  flush(): void;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

export interface SlateState {
  editorState?: Value;
}

const HoverButtons = ({
  editorState,
  editor,
  plugins,
  translations,
}: PluginButtonProps & SlateProps) => (
  <div>
    {plugins &&
      plugins.map(
        (plugin: Plugin, i: number) =>
          plugin.hoverButtons &&
          plugin.hoverButtons.map((Button, j: number) => (
            <Button
              translations={translations}
              key={`${i}-${j}`}
              editorState={editorState}
              editor={editor}
            />
          ))
      )}
  </div>
);

const ToolbarButtons = ({
  plugins,
  editorState,
  editor,
  translations,
}: PluginButtonProps & SlateProps) => (
  <div>
    {plugins &&
      plugins.map(
        (plugin: Plugin, i: number) =>
          plugin.toolbarButtons &&
          plugin.toolbarButtons.map((Button, j: number) => (
            <Button
              translations={translations}
              key={`${i}-${j}`}
              editorState={editorState}
              editor={editor}
            />
          ))
      )}
  </div>
);

class Slate extends React.Component<SlateProps, SlateState> {
  private toolbar: React.RefObject<HTMLDivElement>;
  private editor: React.RefObject<CoreEditor>;
  private flushStateDebounced: (() => void) & Cancelable;

  constructor(props: SlateProps) {
    super(props);
    this.state = {};
    this.editor = React.createRef();
    this.toolbar = React.createRef();
    this.flushStateDebounced = debounce(this.flushState, 1000, {
      leading: true,
      trailing: true,
      maxWait: 10000,
    });
  }

  componentDidMount = () => {
    this.updateToolbar();
  }

  flushState = () => {
    if (this.state.editorState) {
      this.props.onChange({ editorState: this.state.editorState });
    }
  }

  getState() {
    return this.state.editorState !== undefined
      ? this.state.editorState
      : this.props.state.editorState;
  }

  onStateChange = ({ value }: { value: Value }) => {
    this.setState(
      {
        editorState: value,
      },
      () => {
        this.updateToolbar();
      }
    );
    this.flushStateDebounced();
  }

  updateToolbar = () => {
    const editorState = this.getState();
    const toolbar = this.toolbar.current;

    if (
      !toolbar ||
      editorState.selection.isBlurred ||
      editorState.selection.isCollapsed
    ) {
      return;
    }
    let s = window.getSelection();
    let oRange = s.getRangeAt(0); // get the text range
    let oRect = oRange.getBoundingClientRect();
    if (oRect) {
      const { left, top, width } = oRect;

      toolbar.style.opacity = '1';
      toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`;
      toolbar.style.left = `${left +
        window.scrollX -
        toolbar.offsetWidth / 2 +
        width / 2}px`;
    }
  }

  onPaste = (e: Event, editor: CoreEditor, next: NextType) => {
    const transfer = getEventTransfer(e);
    if (transfer.type !== 'html') {
      return next();
    }

    this.props.serializeFunctions
      .htmlToSlate(
        // tslint:disable-next-line:no-any
        (transfer as any).html
      )
      .then(({ document }) => {
        editor.insertFragment(document);
      });
    return true;
  }

  onKeyDown = (
    e: KeyboardEvent,
    editor: CoreEditor,
    next: NextType
  ): boolean => {
    // we need to prevent slate from handling undo and redo
    if (isHotkey(['mod+z', 'mod+y'], e)) {
      this.setState({ editorState: undefined });
      return true;
    }

    if (isHotkey('shift+enter', e)) {
      e.preventDefault();
      editor.insertText('\n');
      return true;
    }

    return next();
  }

  render() {
    const { focused, readOnly, plugins } = this.props;
    const editorState = this.getState();
    const isOpened =
      editorState.selection.isExpanded && editorState.selection.isFocused;

    return (
      <div>
        {focused && (
          <Portal>
            {/* ory-prevent-blur is required to prevent global blurring */}
            <ThemeProvider theme={theme}>
              <div
                className={
                  'ory-prevent-blur ory-plugins-content-slate-inline-toolbar ' +
                  (isOpened
                    ? ''
                    : 'ory-plugins-content-slate-inline-toolbar--hidden')
                }
                style={{ padding: 0 }}
                ref={this.toolbar}
              >
                <HoverButtons
                  translations={this.props.translations}
                  editorState={editorState}
                  editor={this.editor.current}
                  {...this.props}
                />
              </div>
            </ThemeProvider>
          </Portal>
        )}
        <Editor
          ref={(this.editor as unknown) as React.RefObject<Editor>}
          onChange={this.onStateChange}
          onKeyDown={this.onKeyDown}
          readOnly={Boolean(readOnly)}
          className="ory-plugins-content-slate-container"
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          value={editorState}
          plugins={plugins}
          onPaste={this.onPaste}
          placeholder={this.props.translations.placeholder}
        />
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            <ToolbarButtons
              {...this.props}
              translations={this.props.translations}
              editor={this.editor.current}
              editorState={editorState}
            />
          </BottomToolbar>
        )}
      </div>
    );
  }
}

export default Slate;
