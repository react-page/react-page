// @flow
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scoped.css'

const Image = ({ state: { src, caption }, focused }: { state: { src: string }, readOnly: boolean }) => {
  if (!focused && src) {
    return (
      <div>
        <img styleName="image" src={src} />
        {caption ? <p>{caption}</p> : null}
      </div>
    )
  } else if (!focused && !src) {
    return <div styleName="placeholder" />
  } else if (focused && !src) {
    return (
      <div>
        <div styleName="placeholder">
          Click to upload or drag image here
        </div>
        <p>
          <input type="text" placeholder="Enter image description" />
        </p>
      </div>
    )
  }

  return (
    <div>
      <img styleName="image" src={src} />
      <p>Click to upload or drag image here</p>
    </div>
  )
}

export default cssModules(Image, styles)
