import React from 'react'
import Remove from 'material-ui/svg-icons/content/remove'

import './index.css'

const Divider = () => (
  <hr className="ory-plugins-content-divider" />
)

export default {
  Component: Divider,
  name: 'ory/editor/core/content/divider',
  version: '0.0.1',
  IconComponent: <Remove />,
  text: 'Divider',
}
