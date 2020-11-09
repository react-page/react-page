import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Portal,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import FormatSize from '@material-ui/icons/FormatSize';
import * as React from 'react';
import ThemeProvider, { darkTheme } from '../ThemeProvider';
import Tools from './Tools';
import { BottomToolbarProps } from './types';
const darkBlack = 'rgba(0, 0, 0, 0.87)';
const bright = 'rgba(255,255,255, 0.98)';
const brightBorder = 'rgba(0, 0, 0, 0.12)';

const SIZES = [1, 0.8, 0.6, 1.2];
let lastSize = SIZES[0]; // poor mans redux
const BottomToolbar: React.FC<BottomToolbarProps> = ({
  open = false,
  children,
  className,
  dark = false,
  theme,
  anchor = 'bottom',

  title,
  icon = null,
  nodeId,
}) => {
  const [size, setSize] = React.useState(lastSize);
  const toggleSize = () => {
    const newSize = SIZES[(SIZES.indexOf(size) + 1) % SIZES.length];
    setSize(newSize);
    // poor man's redux
    lastSize = newSize;
  };

  return (
    <Portal>
      <ThemeProvider theme={theme ? theme : dark ? darkTheme : null}>
        <Drawer
          SlideProps={{
            mountOnEnter: true,
            unmountOnExit: true,
          }}
          variant="persistent"
          className={className}
          open={open}
          anchor={anchor}
          PaperProps={{
            style: {
              zIndex: 10,
              backgroundColor: 'transparent',
              border: 'none',
              overflow: 'visible',
              pointerEvents: 'none',
            },
          }}
        >
          <div
            style={{
              pointerEvents: 'all',
              border: `${dark ? darkBlack : brightBorder} 1px solid`,
              borderRadius: '4px 4px 0 0',
              backgroundColor: dark ? darkBlack : bright,
              padding: '12px 24px',

              margin: 'auto',
              boxShadow: '0px 1px 8px -1px rgba(0,0,0,0.4)',
              position: 'relative',
              minWidth: '50vw',
              maxWidth: 'calc(100vw - 220px)',
              transformOrigin: 'bottom',
              transform: `scale(${size})`,
              transition: '0.3s',
            }}
          >
            {children}
            <Divider
              style={{
                marginLeft: -24,
                marginRight: -24,
                marginTop: 12,
                marginBottom: 12,
              }}
            />

            <>
              <Grid container={true} direction="row" alignItems="center">
                {icon || title ? (
                  <Grid item={true}>
                    <Avatar
                      children={icon || (title ? title[0] : '')}
                      style={{
                        marginRight: 16,
                      }}
                    />
                  </Grid>
                ) : null}
                <Grid item={true}>
                  <Typography variant="subtitle1">{title}</Typography>
                </Grid>
                <Grid item={true}>
                  <Tooltip title="Toggle Size">
                    <IconButton
                      onClick={toggleSize}
                      aria-label="toggle Size"
                      color="primary"
                    >
                      <FormatSize />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item={true} style={{ marginLeft: 'auto' }}>
                  <Tools nodeId={nodeId} />
                </Grid>
              </Grid>
            </>
          </div>
        </Drawer>
      </ThemeProvider>
    </Portal>
  );
};

export default React.memo(BottomToolbar);
