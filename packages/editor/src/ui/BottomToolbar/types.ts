export type BottomToolbarProps = {
  open?: boolean;

  children?: React.ReactNode;
  className?: string;
  dark: boolean;
  anchor?: 'top' | 'bottom' | 'left' | 'right';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme?: any;
} & ToolsProps;

export type ToolsProps = {
  nodeId: string;
};
