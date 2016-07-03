import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Image = ({ src }) => (
  <div styleName="box">
    {src ? <img styleName="image" src={src} /> : <div styleName="placeholder" />}
  </div>
)

Image.propTypes = {
  onChange: PropTypes.func.isRequired,
  src: PropTypes.string
}

export default cssModules(Image, styles)
