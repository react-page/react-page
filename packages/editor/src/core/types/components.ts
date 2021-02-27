import { BottomToolbarProps } from '../../ui/BottomToolbar/types';
import { CellPluginComponentProps, CellPluginMissingProps } from './plugins';

/**
 * Internal component overrides for the editor.
 */
export type Components = {
  /**
   * BottomToolbar used for rendering plugin controls.
   */
  BottomToolbar?: React.ComponentType<BottomToolbarProps>;
  CellPluginMissing?: React.ComponentType<CellPluginMissingProps>;
};
