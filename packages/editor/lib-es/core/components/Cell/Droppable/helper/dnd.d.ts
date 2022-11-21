import type { DropTargetMonitor } from 'react-dnd';
import type { HoverTarget } from '../../../../service/hover/computeHover';
import type { HoverInsertActions, CellPluginList } from '../../../../types';
export declare const onHover: import("lodash").DebouncedFunc<(target: HoverTarget, monitor: DropTargetMonitor, element: HTMLElement, actions: HoverInsertActions, cellPlugins: CellPluginList) => void>;
export declare const onDrop: (target: HoverTarget, monitor: DropTargetMonitor, element: HTMLElement, actions: HoverInsertActions, cellPlugins: CellPluginList) => void;
//# sourceMappingURL=dnd.d.ts.map