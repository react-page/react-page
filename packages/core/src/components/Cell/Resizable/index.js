// @flow
import React, { Component } from 'react'
import { Resizable as ReactResizeable } from 'react-resizable'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { createStructuredSelector } from 'reselect'

import { resizeMode, editMode } from '../../../actions/display'
import { computeStepWidth, widthToSize } from './helper.js'
import type { ComponetizedCell } from '../../../types/editable'
import { shouldPureComponentUpdate } from '../../../helper/shouldComponentUpdate'

type Props = ComponetizedCell

class Resizable extends Component {
  constructor(props: Props) {
    super(props)

    const sw = computeStepWidth(props)
    this.state = {
      stepWidth: sw,
      width: props.node.size * sw,
      steps: props.steps - 1 || 11
    }
  }

  state: Object = {
    stepWidth: Number,
    width: Number,
    steps: Number
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  props: Props

  onResize = (event: Event, { size }: Object) => {
    const newSize = widthToSize(this.state, this.props, size)
    if (!newSize) {
      console.warn('Expected resize event to yield a valid size, but got', {
        newSize,
        size,
        props: this.props,
        state: this.state
      })
      return
    }

    this.props.onChange(newSize)
    this.setState({ width: newSize * this.state.stepWidth })
  }

  render() {
    const { node: { bounds, inline }, children } = this.props

    return (
      <ReactResizeable
        className={classNames('ory-cell-inner', 'ory-cell-resizable', {
          [`ory-cell-resizable-inline-${inline || ''}`]: inline
        })}
        onResize={this.onResize}
        minConstraints={inline ? null : [this.state.stepWidth, Infinity]}
        maxConstraints={
          inline ? null : [bounds.right * this.state.stepWidth, Infinity]
        }
        draggableOpts={{ axis: 'none', offsetParent: document.body }}
        width={this.state.width}
        height={0}
      >
        {/* this div needs to be kept or resize will be broken */}
        <div>{children}</div>
      </ReactResizeable>
    )
  }
}

const mapStateToProps = createStructuredSelector({})

const mapDispatchToProps = { resizeMode, editMode }

export default connect(mapStateToProps, mapDispatchToProps)(Resizable)
