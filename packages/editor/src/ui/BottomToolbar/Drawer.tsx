import { useTheme } from '@mui/material';
import type { DrawerProps } from '@mui/material';
import { Divider, Drawer, Portal } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';
import React, { Fragment } from 'react';
import { useIsSmallScreen } from '../../core/components/hooks';

const darkBlack = 'rgba(0, 0, 0, 0.87)';
const bright = 'rgba(255,255,255, 0.98)';
const brightBorder = 'rgba(0, 0, 0, 0.12)';

export type BottomToolbarDrawerProps = {
  open: boolean;
  style?: React.CSSProperties;
  className?: string;
  anchor?: DrawerProps['anchor'];
  dark?: boolean;
  scale?: number;
};

export const BottomToolbarDrawer: FC<
  PropsWithChildren<BottomToolbarDrawerProps>
> = ({ className, anchor, open, scale = 1, children, style = {} }) => {
  const divider = (
    <Divider
      style={{
        marginLeft: -24,
        marginRight: -24,
        marginTop: 12,
        marginBottom: 12,
      }}
    />
  );

  const theChildren = React.Children.toArray(children).filter(Boolean);
  const isSmall = useIsSmallScreen();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  return (
    <Portal>
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

            ...(isSmall
              ? {
                  marginLeft: 20,
                  marginRight: 80,
                }
              : {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  minWidth: '50vw',
                  maxWidth: 'min(1280px, calc(100vw - 250px))',
                }),
            boxShadow: '0px 1px 8px -1px rgba(0,0,0,0.4)',
            position: 'relative',

            transformOrigin: 'bottom',
            transform: `scale(${scale})`,
            transition: 'scale 0.3s',
            ...style,
          }}
        >
          {theChildren.map((child, index) => (
            <Fragment key={index}>
              {child}
              {index < theChildren.length - 1 ? divider : null}
            </Fragment>
          ))}
        </div>
      </Drawer>
    </Portal>
  );
};
