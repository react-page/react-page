// @flow
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Image = ({ state: { src } }: { state: { src: string } }) => (
  <div styleName="box">
    {src ? <img styleName="image" src={src} /> : <div styleName="placeholder" />}
  </div>
)

Image.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: {
    src: PropTypes.string
  }
}

export default cssModules(Image, styles)
