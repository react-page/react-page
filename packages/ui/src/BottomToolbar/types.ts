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
  // FIXME: seems like we use more and more information about the current cell. we should refactor this
  id: string;
  editable: string;
  // tslint:disable-next-line:no-any
  theme?: any;
}
