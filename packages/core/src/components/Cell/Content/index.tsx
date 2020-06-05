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
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  updateCellContent,
  UpdateCellContentAction,
} from '../../../actions/cell';
import { connect } from '../../../reduxConnect';
import {
  isEditMode,
  isInsertMode,
  isLayoutMode,
  isPreviewMode,
  isResizeMode,
} from '../../../selector/display';
import { ContentPluginProps } from '../../../service/plugin/classes';
import { ComponetizedCell } from '../../../types/editable';
import scrollIntoViewWithOffset from '../utils/scrollIntoViewWithOffset';

// TODO clean me up #157
class Content extends React.PureComponent<ComponetizedCell> {
  private ref: HTMLDivElement;

  UNSAFE_componentWillReceiveProps(nextProps: ComponetizedCell) {
    const {
      node: { focused: was, scrollToCell: scrollToCellWas },
    } = this.props;
    const {
      node: { focused: is, scrollToCell: scrollToCellIs, focusSource },
    } = nextProps;
    const {
      editable,
      id,
      node: {
        content: {
          plugin: {
            handleFocus = () => null,
            handleBlur = () => null,
            name = 'N/A',
            version = 'N/A',
          } = {},
          state = {},
        } = {},
        focused,
      },
    } = nextProps;

    // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pass: ContentPluginProps = {
      editable,
      id,
      state,
      focused: this.props.isEditMode && focused,
      readOnly: !isEditMode,
      onChange: this.props.updateCellContent,
      name,
      version,
      isEditMode: nextProps.isEditMode,
      isResizeMode: nextProps.isResizeMode,
      isPreviewMode: nextProps.isPreviewMode,
      isInsertMode: nextProps.isInsertMode,
      isLayoutMode: nextProps.isLayoutMode,
      remove: nextProps.removeCell,
    };

    // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
    // can set some side effects.
    if (!scrollToCellWas && scrollToCellIs) {
      if (this.ref) {
        scrollIntoViewWithOffset(this.ref, 100);
      }
    }
    if (!was && is) {
      // We need this because otherwise we lose hotkey focus on elements like spoilers.
      // This could probably be solved in an easier way by listening to window.document?

      handleFocus(pass, focusSource, this.ref);
    } else if (was && !is) {
      handleBlur(pass);
    }
  }

  onRef = (ref: HTMLDivElement) => {
    this.ref = ref;
  };

  onChange = (state) => {
    this.props.updateCellContent(state);
  };
  remove = () => {
    this.props.removeCell();
  };
  focus = (args) => {
    this.props.focusCell(args);
  };

  render() {
    const {
      editable,
      id,
      node: {
        content: {
          plugin: {
            Component = () => null,
            name = 'N/A',
            version = 'N/A',
            text = 'unnamed plugin',
          } = {},
          state = {},
        } = {},
        focused,
      },
    } = this.props;
    const { blurCell } = this.props;

    let focusProps;
    if (!this.props.isPreviewMode) {
      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            this.focus({ source: 'onMouseDown' });
          }
          return true;
        },
      };
    }
    return (
      <div
        {...focusProps}
        tabIndex="-1"
        style={{ outline: 'none' }}
        ref={this.onRef}
        className="ory-cell-inner ory-cell-leaf"
      >
        <Component
          editable={editable}
          id={id}
          state={state}
          focused={Boolean(this.props.isEditMode && focused)}
          name={name}
          text={text}
          version={version}
          readOnly={!this.props.isEditMode}
          onChange={this.onChange}
          focus={this.focus}
          blur={blurCell}
          isInsertMode={this.props.isInsertMode}
          isResizeMode={this.props.isResizeMode}
          isPreviewMode={this.props.isPreviewMode}
          isEditMode={this.props.isEditMode}
          isLayoutMode={this.props.isLayoutMode}
          remove={this.remove}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode,
});

const mapDispatchToProps = (
  dispatch: Dispatch<UpdateCellContentAction>,
  { id }: ComponetizedCell
) =>
  bindActionCreators(
    {
      updateCellContent: updateCellContent(id),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch as any
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);
