import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import type { ReactNode } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export type ListDelFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  { icon?: ReactNode }
>;

function ListDel({
  disabled,
  icon = <DeleteForeverRoundedIcon />,
  name,
  readOnly,
  ...props
}: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.minCount ?? 0 >= (parent.value ?? []).length);

  return (
    <IconButton
      {...filterDOMProps(props)}
      disabled={!limitNotReached}
      sx={{ padding: 0 }}
      onClick={() => {
        if (!readOnly) {
          const value = (parent.value ?? []).slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
      size="large"
    >
      {icon}
    </IconButton>
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
