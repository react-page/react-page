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

/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { Portal } from 'react-portal';
import position from 'selection-position';
import { Editor } from 'slate-react';
import { BottomToolbar, ThemeProvider } from 'ory-editor-ui';
import { placeholder } from '../const';

import { html as serializer } from '../hooks';
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';
import { SlateState } from './../types/state';

const onBlur = (_event, _data, state) => state;

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

export type SlateProps = ContentPluginProps<SlateState> & SlateState;

class Slate extends React.Component<SlateProps> {
  toolbar: HTMLDivElement;
  selection: Selection;
  componentDidMount = () => {
    this.selection = window.getSelection();
    this.updateToolbar();
  }

  shouldComponentUpdate = nextProps =>
    nextProps.state.editorState !== this.props.state.editorState ||
    nextProps.focused !== this.props.focused ||
    nextProps.readOnly !== this.props.readOnly

  componentDidUpdate = () => this.updateToolbar();

  onStateChange = ({ value }) => {
    this.props.onChange({ editorState: value });
  }

  handleOpen = portal => {
    // this.toolbar = portal.firstChild
  }

  updateToolbar = () => {
    const { editorState } = this.props.state;
    const toolbar = this.toolbar;

    if (
      !toolbar ||
      editorState.isBlurred ||
      editorState.selection.isCollapsed
    ) {
      return;
    }
    const pos = position();
    if (pos) {
      const { left, top, width } = position();

      toolbar.style.opacity = '1';
      toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`;
      toolbar.style.left = `${left +
        window.scrollX -
        toolbar.offsetWidth / 2 +
        width / 2}px`;
    }
  }

  onPaste = (e, data, state) => {
    if (data.type !== 'html') { return; }
    if (data.isShift) { return; }

    const { document } = serializer.deserialize(data.html);

    return state.change().insertFragment(document);
  }

  render() {
    const {
      focused,
      readOnly,
      state: { editorState },
      plugins,
      onKeyDown,
      HoverButtons,
      ToolbarButtons,
      focus,
    // tslint:disable-next-line:no-any
    } = this.props as any;
    const isOpened = editorState.selection.isExpanded && editorState.isFocused;

    return (
      <div>
        <Portal onOpen={this.handleOpen}>
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
              ref={toolbar => {
                this.toolbar = toolbar;
                toolbar && this.updateToolbar();
              }}
            >
              <HoverButtons
                editorState={editorState}
                onChange={this.onStateChange}
                focus={focus}
              />
            </div>
          </ThemeProvider>
        </Portal>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={onKeyDown}
          readOnly={Boolean(readOnly)}
          className="ory-plugins-content-slate-container"
          onBlur={onBlur}
          value={editorState}
          plugins={plugins}
          onPaste={this.onPaste}
          placeholder={placeholder}
        />
        {readOnly ? null : (
          <BottomToolbar open={focused}>
            <ToolbarButtons
              editorState={editorState}
              onChange={this.onStateChange}
              focus={focus}
            />
          </BottomToolbar>
        )}
      </div>
    );
  }
}

export default Slate;
