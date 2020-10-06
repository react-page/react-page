export type BottomToolbarProps = {
  open?: boolean;

  children?: React.ReactNode;
  className?: string;
  dark: boolean;
  title?: string;
  anchor?: 'top' | 'bottom' | 'left' | 'right';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme?: any;
} & ToolsProps;

export type ToolsProps = {
  nodeId: string;
};
