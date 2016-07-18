import React, { PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import cssModules from 'react-css-modules'

import styles from '../index.scoped.css'

const Button = ({ description, icon, onClick, active }) => (
  <div>
    <div styleName="button">
      <FloatingActionButton
        secondary={active}
        onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
}

export default cssModules(Button, styles)
