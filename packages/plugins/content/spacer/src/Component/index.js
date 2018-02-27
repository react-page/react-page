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
import React, { Component } from 'react'
import { Resizable } from 'react-resizable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import classNames from 'classnames'
import TextField from 'material-ui/TextField'

import { BottomToolbar } from 'ory-editor-ui'

const faintBlack = 'rgba(0, 0, 0, 0.12)'

const compute = ({ height }: { height: number }) => ({
  height: height > 24 ? height : 24
})

const fire = ({
  state,
  onChange
}: {
  state: Object,
  onChange(state: Object): void
}) => onChange(state)

const Solid = ({ height }: { height: number }) => <div style={{ height }} />

const handleChange = (onChange: Function) => (e: Event) => {
  const target = e.target
  if (target instanceof HTMLInputElement) {
    onChange({ height: parseInt(target.value) })
    return
  }
}

class Spacer extends Component {
  state = {}

  onResize = (
    event: Event,
    { size }: { size: { height: number, width: number } }
  ) => {
    const { onChange } = this.props
    const state = compute(size)
    fire({ onChange, state })
  }

  render() {
    const { readOnly, isPreviewMode, focused, onChange } = this.props
    const height = this.props.state.height > 0 ? this.props.state.height : 1

    return (
      <div
        style={{ border: 'solid 1px', borderColor: faintBlack }}
        className={classNames('ory-plugins-content-spacer', {
          'ory-plugins-content-spacer-read-only': isPreviewMode
        })}
      >
        {readOnly ? (
          <Solid height={height} />
        ) : (
          <Resizable onResize={this.onResize} height={height} width={0}>
            <div style={{ height, position: 'relative' }}>
              <MuiThemeProvider>
                <BottomToolbar open={focused}>
                  <TextField
                    hintText="24"
                    floatingLabelText="Element height (px)"
                    inputStyle={{ color: 'white' }}
                    floatingLabelStyle={{ color: 'white' }}
                    hintStyle={{ color: 'grey' }}
                    style={{ width: '512px' }}
                    value={height}
                    onChange={handleChange(onChange)}
                  />
                </BottomToolbar>
              </MuiThemeProvider>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  height: '24px',
                  width: '100%',
                  background: faintBlack,
                  textAlign: 'center'
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ color: 'white', width: 24, height: 24 }}
                >
                  <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                </svg>
              </div>
            </div>
          </Resizable>
        )}
      </div>
    )
  }
}

export default Spacer
