/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

// @flow
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import React from 'react'
import { darkBlack } from 'material-ui/styles/colors'

const BottomToolbar = ({
  open = false,
  children,
  className
}: {
  open?: boolean,
  children?: Object,
  className?: string
}) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Drawer
      className={className}
      open={open}
      docked
      containerStyle={{
        top: 'inherit',
        bottom: '0px',
        height: 'auto',
        margin: '0 auto',
        left: '0',
        right: '0',
        width: 'auto',
        transform: `translate(0, ${open ? '0' : '300px'})`,
        textAlign: 'center',
        background: 'transparent',
        border: 'transparent',
        overflow: 'visible',
        boxShadow: 'none',
        zIndex: 5
      }}
    >
      <div
        style={{
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
