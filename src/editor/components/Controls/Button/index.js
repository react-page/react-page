// @flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import cssModules from 'react-css-modules'
import device from 'device.js'

import styles from '../index.scoped.css'

const Button = ({ description, icon, onClick, active, disabled }: {
  description: string,
  icon: any,
  active: boolean,
  disabled: boolean,
  onClick: Function,
  description: string
}) => (
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

export default cssModules(Button, styles)
