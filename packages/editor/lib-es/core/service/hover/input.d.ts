import type { DropTargetMonitor } from 'react-dnd';
import type { CellPluginList, PartialCell } from '../../types';
import type { HoverInsertActions } from '../../types/hover';
import type { HoverTarget } from './computeHover';
export declare const computeAndDispatchInsert: (hover: HoverTarget, drag: PartialCell, monitor: DropTargetMonitor, element: HTMLElement, actions: HoverInsertActions, cellPlugins: CellPluginList) => void;
export declare const computeAndDispatchHover: (hover: HoverTarget, drag: PartialCell, monitor: DropTargetMonitor, element: HTMLElement, actions: HoverInsertActions, cellPlugins: CellPluginList) => void;
//# sourceMappingURL=input.d.ts.map