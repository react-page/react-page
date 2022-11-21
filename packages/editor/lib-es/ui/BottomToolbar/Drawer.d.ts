import type { DrawerProps } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
export type BottomToolbarDrawerProps = {
    open: boolean;
    style?: React.CSSProperties;
    className?: string;
    anchor?: DrawerProps['anchor'];
    dark?: boolean;
    scale?: number;
};
export declare const BottomToolbarDrawer: FC<PropsWithChildren<BottomToolbarDrawerProps>>;
//# sourceMappingURL=Drawer.d.ts.map