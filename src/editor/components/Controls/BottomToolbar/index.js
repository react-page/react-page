// @flow
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import React from 'react'
import { darkBlack } from 'material-ui/styles/colors'

const BottomToolbar = ({ open = false, children, className }: { open?: boolean, children?: Object, className?: string }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Drawer className={className} open={open} docked containerStyle={{
      top: 'inherit',
      bottom: '-10px',
      height: 'auto',
      margin: '0 auto',
      maxWidth: '65%',
      left: '0',
      right: '0',
      width: 'auto',
      transform: `translate(0, ${open ? '0' : '110px'})`,
      textAlign: 'center',
      background: 'transparent',
      border: 'transparent',
      overflow: 'visible',
      boxShadow: 'none'
    }}
    >
      <div style={{
        display: 'inline-block',
        border: `${darkBlack} 1px solid`,
        borderRadius: '4px 4px 0',
        backgroundColor: darkBlack,
        padding: '12px 24px'
      }}
      >
        {children}
      </div>
    </Drawer>
  </MuiThemeProvider>
)

export default BottomToolbar
