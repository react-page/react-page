import React, { Component } from 'react'
import onElementResize from 'element-resize-event'
import classNames from 'classnames'
import connect from '../ServerContext/connect'

const defaultGetWidth = (element) => element.clientWidth
const defaultGetHeight = (element) => element.clientHeight

const Dimensions = ({
  getHeight = defaultGetHeight,
  getWidth = defaultGetWidth,
  className = null,
  elementResize = false
} = {}) => (ComposedComponent) => {
  class Decorator extends Component {
    state = {}

    componentDidMount() {
      if (this.isServerContext()) {
        return
      }

      if (!this.containerRef) {
        throw new Error('Cannot find container div')
      }

      this.updateDimensions()
      if (elementResize) {
        // Experimental: `element-resize-event` fires when an element resizes.
        // It attaches its own window resize listener and also uses
        // requestAnimationFrame, so we can just call `this.updateDimensions`.
        onElementResize(this.containerRef, this.updateDimensions)
      } else {
        this.getWindow().addEventListener('resize', this.onResize, false)
      }
    }

    componentWillUnmount() {
      if (this.isServerContext()) {
        return
      }

      this.getWindow().removeEventListener('resize', this.onResize)
    }

    props: {isServerContext: boolean}


    updateDimensions = () => {
      if (this.isServerContext()) {
        return
      }

      const container = this.containerRef
      const containerWidth = getWidth(container)
      const containerHeight = getHeight(container)

      if (containerWidth !== this.state.containerWidth || containerHeight !== this.state.containerHeight) {
        this.setState({ containerWidth, containerHeight })
      }
    }

    isServerContext = () => Boolean(this.props.isServerContext)

    onResize = () => {
      if (this.isServerContext()) {
        return
      }

      if (this.rqf) {
        return
      }

      this.rqf = this.getWindow().requestAnimationFrame(() => {
        this.rqf = null
        this.updateDimensions()
      })
    }

    // If the component is mounted in a different window to the javascript
    // context, as with https://github.com/JakeGinnivan/react-popout
    // then the `window` global will be different from the `window` that
    // contains the component.
    // Depends on `defaultView` which is not supported <IE9
    getWindow() {
      return this.containerRef ? (this.containerRef.ownerDocument.defaultView || window) : window
    }

    onContainerRef = (ref) => {
      this.containerRef = ref
    }

    render() {
      if (this.isServerContext()) {
        return (
          <ComposedComponent
            {...this.state}
            {...this.props}
            updateDimensions={this.updateDimensions}
          />
        )
      }

      return (
        <div className={classNames(className, 'ory-dimensions')} ref={this.onContainerRef}>
          <ComposedComponent
            {...this.state}
            {...this.props}
            updateDimensions={this.updateDimensions}
          />
        </div>
      )
    }
  }

  return connect()(Decorator)
}

export default Dimensions
