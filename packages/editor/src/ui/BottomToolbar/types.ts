import type { ReactNode } from 'react';
export type BottomToolbarProps = {
  open?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  dark?: boolean;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  pluginControls?: ReactNode;
  actionsLeft?: ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme?: any;
} & BottomToolbarToolsProps;

export type BottomToolbarToolsProps = {
  nodeId: string;
};
