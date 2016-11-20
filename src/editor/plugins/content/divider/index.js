import React from 'react'
import Remove from 'material-ui/svg-icons/content/remove'

const Divider = () => (
  <hr className="divider" />
)

export default {
  Component: Divider,
  name: 'ory/editor/core/content/divider',
  version: '0.0.1',
  IconComponent: <Remove />,
  text: 'Divider',
}
