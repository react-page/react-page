import type { ReactNode } from 'react';
import React from 'react';

import { IconButton } from '@mui/material';
import type { ListItemProps } from '@mui/material/ListItem';
import ListItemMaterial from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { useDrag, useDrop } from 'react-dnd';
import { connectField, joinName, useField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';
import ListSortField from './ListSortField';

export enum DragItemType {
  ListItemField = 'ListItemField',
}

interface DragItem {
  name: string;
  originalIndex: number;
}

export type ListItemFieldProps = {
  children?: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  removeIcon?: ReactNode;
  dragIcon?: ReactNode;
  moveItemUpIcon?: ReactNode;
  moveItemDownIcon?: ReactNode;
  value?: unknown;
  name?: string;
};

function ListItem({
  children = <AutoField label={null} name="" />,
  dense = true,
  disableGutters,
  divider,
  removeIcon,
  moveItemDownIcon,
  moveItemUpIcon,
  dragIcon = <DragIndicatorIcon />,
  value,
  name,
}: ListItemFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));

  const parent = useField<{}, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const moveItem = (fromIndex: number, toIndex: number) => {
    const value = parent.value!.slice();
    value.splice(fromIndex, 1);
    value.splice(toIndex, 0, parent.value![fromIndex]);
    parent.onChange(value);
  };

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    unknown,
    {
      isDragging: boolean;
    }
  >(
    () => ({
      type: DragItemType.ListItemField,
      item: { name, originalIndex: nameIndex } as DragItem,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [value, nameIndex, moveItem]
  );

  const [, drop] = useDrop(
    () => ({
      accept: DragItemType.ListItemField,
      drop: (draggedItem: DragItem, monitor) => {
        const didDrop = monitor.canDrop();
        if (didDrop && draggedItem.name !== name)
          moveItem(draggedItem.originalIndex, nameIndex);
      },
    }),
    [moveItem]
  );

  return (
    <ListItemMaterial
      dense={dense}
      disableGutters={disableGutters}
      divider={divider}
      ref={(node) => drag(drop(node))}
    >
      <Stack>
        <IconButton size="large">{dragIcon}</IconButton>
        <ListSortField
          name=""
          iconDown={moveItemDownIcon}
          iconUp={moveItemUpIcon}
          handleMove={moveItem}
        />
      </Stack>
      {children}
      <ListDelField name="" icon={removeIcon} />
    </ListItemMaterial>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
