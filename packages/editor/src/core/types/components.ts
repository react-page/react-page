import type { BottomToolbarProps } from '../../ui/BottomToolbar/types';
import type { CellPluginMissingProps } from './plugins';
import type { HTMLCellProps, HTMLRowProps } from '../../renderer/HTMLRenderer';
import type { RowProps } from '../components/Row';
import type { CellProps } from '../components/Cell';

/**
 * Internal component overrides for the editor.
 */
export type Components = {
  /**
   * BottomToolbar used for rendering plugin controls.
   */
  BottomToolbar?: React.ComponentType<BottomToolbarProps>;
  CellPluginMissing?: React.ComponentType<CellPluginMissingProps>;
  EditModeResizeHandle?: React.ComponentType<{ onClick: () => void }>;
  Cell?: React.ComponentType<CellProps>;
  Row?: React.ComponentType<RowProps>;
  HTMLCell?: React.ComponentType<HTMLCellProps>;
  HTMLRow?: React.ComponentType<HTMLRowProps>;
};
