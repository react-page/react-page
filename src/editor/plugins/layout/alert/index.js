// @flow
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import Announcement from 'material-ui/svg-icons/action/announcement'
import { createRowPlaceholder } from 'src/editor/plugins/content/placeholder'
import { LayoutPlugin } from 'src/editor/service/plugin/classes'

import styles from './index.scoped.css'

const Alert = ({ children, state }: { children: Object, state: Object }) => (
  <div styleName="alert">
    <div {...state}>
      {children}
    </div>
  </div>
)

Alert.propTypes = {
  children: PropTypes.node,
  state: PropTypes.object
}

export default class AlertPlugin extends LayoutPlugin {
  Component = cssModules(Alert, styles)
  name = 'ory/layout/alert'
  version = '0.0.1'
  icon = <Announcement />
  text = 'Announcement'

  createInitialState = createRowPlaceholder
}
