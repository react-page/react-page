import React, { Component } from 'react'
import classNames from 'classnames'

const defaultGetWidth = element => element.clientWidth
const defaultGetHeight = element => element.clientHeight

const Dimensions = (
  {
    getHeight = defaultGetHeight,
    getWidth = defaultGetWidth,
    className = null,
  } = {}
) => ComposedComponent => {
  class Decorator extends Component {
    state = {}

    componentDidMount() {
      if (!this.containerRef) {
        throw new Error('Cannot find container div')
      }

      this.updateDimensions()
    }

    // This cann not be used here because it doesn't listen to state changes.
    // shouldComponentUpdate = shouldPureComponentUpdate

    updateDimensions = () => {
      const container = this.containerRef
      const containerWidth = getWidth(container)
      const containerHeight = getHeight(container)

      if (
        containerWidth !== this.state.containerWidth ||
        containerHeight !== this.state.containerHeight
      ) {
        this.setState({ containerWidth, containerHeight })
      }
    }

    // If the component is mounted in a different window to the javascript
    // context, as with https://github.com/JakeGinnivan/react-popout
    // then the `window` global will be different from the `window` that
    // contains the component.
    // Depends on `defaultView` which is not supported <IE9
    getWindow() {
      return this.containerRef
        ? this.containerRef.ownerDocument.defaultView || window
        : window
    }

    onContainerRef = ref => {
      this.containerRef = ref
    }

    render() {
      return (
        <div
          className={classNames(className, 'ory-dimensions')}
          ref={this.onContainerRef}
        >
          <ComposedComponent
            {...this.state}
            {...this.props}
            updateDimensions={this.updateDimensions}
          />
        </div>
      )
    }
  }

  return Decorator
}

export default Dimensions
