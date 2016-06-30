import React, { PropTypes } from 'react'

const Image = ({ src }) => (
  <div>
    <img src={src} />
  </div>
)

Image.propTypes = {
  src: PropTypes.string.isRequired
}

export default {
  Component: Image,
  name: 'ory/content/image',
  version: '0.0.1'
}
