import { ButtonGroup, Stack, styled } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButtonMaterial from '@mui/material/IconButton';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import type { ReactNode } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';

const IconButton = styled(IconButtonMaterial)({ padding: 0 });

export type ListSortFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  {
    iconUp?: ReactNode;
    iconDown?: ReactNode;
    dragIcon?: ReactNode;
    handleMove: (fromIndex: number, toIndex: number) => void;
  }
>;

function ListSort({
  disabled,
  iconUp = <ArrowUpwardIcon />,
  iconDown = <ArrowDownwardIcon />,
  dragIcon = <DragIndicatorIcon />,
  handleMove,
  name,
  readOnly,
  ...props
}: ListSortFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));

  const parent = useField<Record<string, unknown>, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReachedUp = !disabled && nameIndex !== 0;

  const limitNotReachedDown =
    !disabled && nameIndex !== (parent.value ?? []).length - 1;

  return (
    <Stack direction="row">
      <IconButton
        disabled={(parent.value ?? []).length < 2}
        size="large"
        sx={{ padding: 0 }}
      >
        {dragIcon}
      </IconButton>

      <ButtonGroup orientation="vertical" size="large">
        <IconButton
          {...filterDOMProps(props)}
          disabled={!limitNotReachedUp}
          onClick={() => handleMove(nameIndex, nameIndex - 1)}
        >
          {iconUp}
        </IconButton>
        <IconButton
          {...filterDOMProps(props)}
          disabled={!limitNotReachedDown}
          onClick={() => handleMove(nameIndex, nameIndex + 1)}
        >
          {iconDown}
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
}

export default connectField<ListSortFieldProps>(ListSort, {
  initialValue: false,
  kind: 'leaf',
});
