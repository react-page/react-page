// @flow
import React from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Placeholder = () => (
  <div styleName="placeholder">
    Drop items above, below, left of or right of here.
  </div>
)

export default cssModules(Placeholder, styles)
