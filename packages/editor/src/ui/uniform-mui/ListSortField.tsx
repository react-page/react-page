import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';
import type { ReactNode } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';

export type ListSortFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  {
    iconUp?: ReactNode;
    iconDown?: ReactNode;
    handleMove: (fromIndex: number, toIndex: number) => void;
  }
>;

function ListSort({
  disabled,
  iconUp = '↑',
  iconDown = '↓',
  handleMove,
  name,
  readOnly,
  ...props
}: ListSortFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));

  const parent = useField<{}, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReachedUp = !disabled && nameIndex !== 0;

  const limitNotReachedDown =
    !disabled && nameIndex !== parent.value!.length - 1;

  return (
    <Stack>
      <IconButton
        {...filterDOMProps(props)}
        disabled={!limitNotReachedUp}
        onClick={() => handleMove(nameIndex, nameIndex - 1)}
        size="large"
      >
        {iconUp}
      </IconButton>
      <IconButton
        {...filterDOMProps(props)}
        disabled={!limitNotReachedDown}
        onClick={() => handleMove(nameIndex, nameIndex + 1)}
        size="large"
      >
        {iconDown}
      </IconButton>
    </Stack>
  );
}

export default connectField<ListSortFieldProps>(ListSort, {
  initialValue: false,
  kind: 'leaf',
});
