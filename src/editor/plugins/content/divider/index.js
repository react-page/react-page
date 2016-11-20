// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Remove from 'material-ui/svg-icons/content/remove'
import cssModules from 'react-css-modules'
import styles from './index.scoped.css'

const Divider = () => (
  <hr styleName="divider" className="divider" />
)

export default {
  Component: cssModules(Divider, styles),
  name: 'ory/editor/core/content/divider',
  version: '0.0.1',
  IconComponent: <Remove />,
  text: 'Divider',
}
