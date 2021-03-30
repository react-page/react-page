import { BottomToolbarProps } from '../../ui/BottomToolbar/types';
import { CellPluginMissingProps } from './plugins';

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
};
