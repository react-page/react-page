// @flow
import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'
import DragHandle from 'material-ui/svg-icons/editor/drag-handle'
import { white, faintBlack } from 'material-ui/styles/colors'

import styles from './index.scoped.css'

const compute = ({ height }: { height: number }) => ({ height: height > 24 ? height : 24 })

// const fire = debounce(({ state, onChange }: { state: Object, onChange(state: Object): void }) => onChange(state), 5, { leading: false })
const fire = ({ state, onChange }: { state: Object, onChange(state: Object): void }) => onChange(state)

const Solid = ({ height }: { height: number }) => <div style={{ height }} />

Solid.propTypes = {
  height: PropTypes.number
}

class Spacer extends Component {
  state = {}

  onResize = (event: Event, { size }: { size: { height: number, width: number } }) => {
    const { onChange } = this.props
    const state = compute(size)
    fire({ onChange, state })
  }

  render() {
    const { readOnly } = this.props
    const height = compute(this.props.state).height

    return (
      <div style={{ border: 'solid 1px', borderColor: faintBlack }}
           className="editable-spacer"
           styleName={classNames({ spacer: true, 'read-only': readOnly })}
      >
        {readOnly
          ? (
            <Solid height={height} />
        ) : (
          <Resizable onResize={this.onResize} height={height} width={0}>
            <div style={{ height, position: 'relative' }}>
              <div
                style={{ position: 'absolute', bottom: '0', height: '24px', width: '100%', background: faintBlack, textAlign: 'center' }}
              >
                <DragHandle color={white} />
              </div>
            </div>
          </Resizable>
        )}
      </div>
    )
  }
}

Spacer.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.shape({
    height: PropTypes.number
  }),
  readOnly: PropTypes.bool.isRequired
}

export default cssModules(Spacer, styles, { allowMultiple: true })
