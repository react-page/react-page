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
import Delete from '@material-ui/icons/Delete';
import Drawer from '@material-ui/core/Drawer';
import * as React from 'react';

import ThemeProvider, { darkTheme } from '../ThemeProvider';
import {
  Typography,
  Divider,
  IconButton,
  Grid,
  Avatar
} from '@material-ui/core';

const darkBlack = 'rgba(0, 0, 0, 0.87)';
const bright = 'rgba(255,255,255, 0.98)';
const brightBorder = 'rgba(0, 0, 0, 0.12)';
export interface BottomToolbarProps {
  open?: boolean;
  children?: Object;
  className?: string;
  dark: boolean;
  title?: string;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  onDelete?: () => void;
  // tslint:disable-next-line:no-any
  icon?: any;
}

const BottomToolbar: React.SFC<BottomToolbarProps> = ({
  open = false,
  children,
  className,
  dark = false,

  anchor = 'bottom',
  onDelete = null,
  title,
  icon = null,
}) => (
  <ThemeProvider theme={dark ? darkTheme : null}>
    <Drawer
      SlideProps={{
        unmountOnExit: true,
      }}
      variant="persistent"
      className={className}
      open={open}
      anchor={anchor}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          border: 'none',
          overflow: 'visible',
        },
      }}
    >
      <div
        style={{
          border: `${dark ? darkBlack : brightBorder} 1px solid`,
          borderRadius: '4px 4px 0 0',
          backgroundColor: dark ? darkBlack : bright,
          padding: '12px 24px',

          margin: 'auto',
          boxShadow: '0px 1px 8px -1px rgba(0,0,0,0.4)',
          position: 'relative',
          minWidth: '50vw',
          maxWidth: 'calc(100vw - 220px)',
        }}
      >
        {title || onDelete ? (
          <>
            <Grid container={true} direction="row" alignItems="center">
              <Grid item={true}>
                <Avatar
                  children={icon || (title ? title[0] : '')}
                  style={{
                    marginRight: 16,
                  }}
                />
              </Grid>
              <Grid item={true}>
                <Typography variant="subtitle1">{title}</Typography>
              </Grid>
              {onDelete ? (
                <Grid item={true} style={{ marginLeft: 'auto' }}>
                  <IconButton
                    onClick={onDelete}
                    aria-label="delete"
                    color="secondary"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>

            <Divider
              style={{
                marginLeft: -24,
                marginRight: -24,
                marginTop: 12,
                marginBottom: 12,
              }}
            />
          </>
        ) : null}
        {children}
      </div>
    </Drawer>
  </ThemeProvider>
);

export default BottomToolbar;
