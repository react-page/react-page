import type { BottomToolbarProps } from '../../ui/BottomToolbar/types';
import type { InsertNewProps } from '../components/Cell/InsertNew';
import type { CellPluginMissingProps } from './plugins';

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
  InsertNew?: React.ComponentType<InsertNewProps>;
};
