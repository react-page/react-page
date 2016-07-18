import React from 'react'
import cssModules from 'react-css-modules'
import Announcement from 'material-ui/svg-icons/action/announcement'
import { createRowPlaceholder } from 'src/editor/plugins/content/placeholder'

import styles from './index.scoped.css'

const Alert = (props) => (
  <div styleName="alert">
    <div {...props} />
  </div>
)

Alert.propTypes = {}

export default {
  Component: cssModules(Alert, styles),
  name: 'ory/layout/alert',
  version: '0.0.1',
  icon: <Announcement />,
  text: 'Announcement',
  insert: {
    ...createRowPlaceholder()
  }
}
