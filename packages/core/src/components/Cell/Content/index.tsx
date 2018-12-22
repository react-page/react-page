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
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  updateCellContent,
  UpdateCellContentAction
} from '../../../actions/cell';
import {
  isEditMode,
  isLayoutMode,
  isPreviewMode,
  isInsertMode,
  isResizeMode
} from '../../../selector/display';

import { ComponetizedCell } from '../../../types/editable';
import { ContentPluginProps } from '../../../service/plugin/classes';

// TODO clean me up #157
class Content extends React.PureComponent<ComponetizedCell> {
  private ref: HTMLDivElement;

  componentWillReceiveProps(nextProps: ComponetizedCell) {
    const {
      node: { focused: was },
    } = this.props;
    const {
      node: { focused: is, focusSource },
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
    // tslint:disable-next-line:no-any
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
    };

    // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
    // can set some side effects.
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
  }

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
          } = {},
          state = {},
        } = {},
        focused,
      },
    } = this.props;
    const { focusCell, blurCell } = this.props;

    let focusProps;
    if (!this.props.isPreviewMode) {
      focusProps = {
        onMouseDown: () => {
          if (!focused) {
            focusCell({ source: 'onMouseDown' });
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
          focused={this.props.isEditMode && focused}
          name={name}
          version={version}
          readOnly={!this.props.isEditMode}
          onChange={this.props.updateCellContent}
          focus={focusCell}
          blur={blurCell}
          isInsertMode={this.props.isInsertMode}
          isResizeMode={this.props.isResizeMode}
          isPreviewMode={this.props.isPreviewMode}
          isEditMode={this.props.isEditMode}
          isLayoutMode={this.props.isLayoutMode}
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
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
