// @flow
import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { device } from 'device.js'

const Button = ({
  description,
  icon,
  onClick,
  active,
  disabled
}: {
  description: string,
  icon: any,
  active: boolean,
  disabled?: boolean,
  onClick: Function,
  description: string
}) => (
  <div className="ory-controls-mode-toggle-button">
    <div className="ory-controls-mode-toggle-button-inner">
      <FloatingActionButton
        secondary={active}
        mini={device.mobile}
        onTouchTap={onClick}
        disabled={disabled}
      >
        {icon}
      </FloatingActionButton>
    </div>
    <div className="ory-controls-mode-toggle-button-description">
      {description}
    </div>
  </div>
)

export default Button
