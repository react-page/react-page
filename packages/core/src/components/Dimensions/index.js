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

import React, { Component } from 'react'
import onElementResize from 'element-resize-event'
import classNames from 'classnames'

const defaultGetWidth = element => element.clientWidth
const defaultGetHeight = element => element.clientHeight

const Dimensions = ({
  getHeight = defaultGetHeight,
  getWidth = defaultGetWidth,
  className = null,
  elementResize = false
} = {}) => ComposedComponent => {
  class Decorator extends Component {
    state = {}

    componentDidMount() {
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

    // This cann not be used here because it doesn't listen to state changes.
    // shouldComponentUpdate = shouldPureComponentUpdate

    componentWillUnmount() {
      this.getWindow().removeEventListener('resize', this.onResize)
    }

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

    onResize = () => {
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
