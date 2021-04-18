import { useDrag, DragPreviewImage } from 'react-dnd';
import type { CellDrag } from '../../../types';
import { useCell, useHoverActions } from '../../hooks';
import React from 'react';
export const dragIcon =
  // tslint:disable-next-line:max-line-length
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';

export const useDragHandle = (nodeId: string, enabled = true) => {
  const actions = useHoverActions();
  const cell = useCell(nodeId);
  const [{ isDragging }, dragRef, preview] = useDrag<
    CellDrag,
    void,
    {
      isDragging: boolean;
    }
  >({
    canDrag: enabled,
    item: () => {
      actions.dragCell(nodeId);
      return { cell };
    },
    type: 'cell',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),

    end(item, monitor) {
      if (monitor.didDrop()) {
        // If the item drop occurred deeper down the tree, don't do anything
        return;
      }
      // If drag ended but drop did not occur, cancel dragging
      actions.cancelCellDrag();
    },
  });
  const previewElement = <DragPreviewImage connect={preview} src={dragIcon} />;
  return [isDragging, dragRef, previewElement] as const;
};
