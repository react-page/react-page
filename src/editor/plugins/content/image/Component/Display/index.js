// @flow
import React from 'react'
import cssModules from 'react-css-modules'
import ImageIcon from 'material-ui/svg-icons/image/panorama'
import styles from '../index.scoped.css'
import { iconStyle } from '../common.js'
import Caption from '../Caption'
import type { PropTypes } from '../index.js'

const Display = ({ state: { src, ...state }, ...props }: PropTypes) => src ? (
  <div>
    <img styleName="image" src={src} />
    <Caption {...props} state={state} />
  </div>
) : (
  <div>
    <div styleName="placeholder">
      <ImageIcon style={iconStyle} />
    </div>
    <Caption {...props} state={state} />
  </div>
)

export default cssModules(Display, styles, { allowMultiple: true })
