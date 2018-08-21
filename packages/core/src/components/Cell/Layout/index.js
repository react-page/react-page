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

// @flow
import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'
import Row from '../../Row'
import { updateCellLayout } from '../../../actions/cell'
import { isEditMode, isPreviewMode } from '../../../selector/display'

import type { ComponetizedCell } from '../../../types/editable'

// TODO clean me up #157
class Layout extends React.Component {
  componentWillReceiveProps(nextProps: ComponetizedCell) {
    const {
      node: { focused: was }
    } = this.props
    const {
      node: { focused: is, focusSource }
    } = nextProps
    const {
      isEditMode,
      editable,
      id,
      node: {
        layout: {
          plugin: { handleFocus, handleBlur, name, version },
          state = {}
        } = {},
        focused
      },
      updateCellContent
    } = nextProps

    // FIXME this is really shitty because it will break when the state changes before the blur comes through, see #157
    const pass = {
      editable,
      id,
      state,
      focused: isEditMode && focused,
      readOnly: !isEditMode,
      onChange: updateCellContent,
      name,
      version
    }

    // Basically we check if the focus state changed and if yes, we execute the callback handler from the plugin, that
    // can set some side effects.
    if (!was && is) {
      // We need this because otherwise we lose hotkey focus on elements like spoilers.
      // This could probably be solved in an easier way by listening to window.document?
      handleFocus(pass, focusSource, this.ref)
    } else if (was && !is) {
      handleBlur(pass)
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate
  props: ComponetizedCell
  ref: HTMLElement

  onRef = (ref: any) => {
    this.ref = ref
  }

  render() {
    const {
      id,
      node: {
        rows = [],
        layout: { plugin: { Component, name, version }, state = {} } = {},
        focused
      },
      editable,
      ancestors = [],
      updateCellLayout,
      isEditMode,
      isPreviewMode
    }: ComponetizedCell = this.props
    const { focusCell, blurCell } = this.props

    let focusProps
    if (!isPreviewMode) {
      focusProps = {
        // FIXME this should be MouseEvent
        onMouseDown: (e: any) => {
          if (
            !focused &&
            e.target.closest('.ory-cell-inner') === findDOMNode(this.ref)
          ) {
            focusCell({ source: 'onMouseDown' })
          }
          return true
        }
      }
    }

    return (
      <div
        {...focusProps}
        tabIndex="-1"
        className="ory-cell-inner"
        ref={this.onRef}
      >
        <Component
          id={id}
          state={state}
          focus={focusCell}
          blur={blurCell}
          editable={editable}
          focused={isEditMode && focused}
          name={name}
          version={version}
          readOnly={!isEditMode}
          onChange={updateCellLayout}
        >
          {rows.map((r: string) => (
            <Row
              editable={editable}
              ancestors={[...ancestors, id]}
              key={r}
              id={r}
            />
          ))}
        </Component>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({ isEditMode, isPreviewMode })

const mapDispatchToProps = (dispatch: Function, { id }: ComponetizedCell) =>
  bindActionCreators(
    {
      updateCellLayout: updateCellLayout(id)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)
