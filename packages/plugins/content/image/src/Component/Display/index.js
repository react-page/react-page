// @flow
import React from 'react'
import ImageIcon from 'material-ui/svg-icons/image/panorama'

import { iconStyle } from '../common.js'
import type { PropTypes } from '../index.js'

const Display = ({ isEditMode, state }: PropTypes) => {
  const Image = (
    <img className="ory-plugins-content-image" src={state.src} />
  )
  return (
    state.src ? (
      <div>
        {state.href && !isEditMode ? (
          <a href={state.href} target={state.target} rel={state.rel}>{Image}</a>
        ) : (
          Image
        )}
      </div>
    ) : (
      <div>
        <div className="ory-plugins-content-image-placeholder">
          <ImageIcon style={iconStyle} />
        </div>
      </div>
    )
  )
}

export default Display
