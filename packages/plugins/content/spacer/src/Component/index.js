// @flow
import React, { Component } from 'react'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'

const faintBlack = 'rgba(0, 0, 0, 0.12)'
const compute = ({ height }: { height: number }) => ({ height: height > 24 ? height : 24 })
const fire = ({ state, onChange }: { state: Object, onChange(state: Object): void }) => onChange(state)
const Solid = ({ height }: { height: number }) => <div style={{ height }} />

class Spacer extends Component {
  state = {}

  onResize = (event: Event, { size }: { size: { height: number, width: number } }) => {
    const { onChange } = this.props
    const state = compute(size)
    fire({ onChange, state })
  }

  render() {
    const { readOnly, isPreviewMode } = this.props
    const height = compute(this.props.state).height

    return (
      <div
        style={{ border: 'solid 1px', borderColor: faintBlack }}
        className={classNames('ory-plugins-content-spacer', { 'ory-plugins-content-spacer-read-only': isPreviewMode })}
      >
        {readOnly
          ? (
            <Solid height={height} />
        ) : (
          <Resizable onResize={this.onResize} height={height} width={0}>
            <div style={{ height, position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '0', height: '24px', width: '100%', background: faintBlack, textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" style={{ color: 'white', width: 24, height: 24 }}>
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
