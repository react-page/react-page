import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import cssModules from 'react-css-modules'
import device from 'device.js'

import styles from '../index.scoped.css'

const Button = ({ description, icon, onClick, active, disabled }) => (
  <div>
    <div styleName="button">
      <FloatingActionButton
        secondary={active}
        mini={device().mobile()}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </FloatingActionButton>
    </div>
    <div styleName="description">
      {description}
    </div>
  </div>
)

Button.propTypes = {
  icon: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
}

export default cssModules(Button, styles)
