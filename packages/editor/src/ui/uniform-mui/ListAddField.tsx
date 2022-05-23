import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { FormControlProps } from '@mui/material/FormControl';
import FormControl from '@mui/material/FormControl';
import cloneDeep from 'lodash/cloneDeep';
import type { ReactNode } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps, joinName, useField } from 'uniforms';

export type ListAddFieldProps = FieldProps<
  unknown,
  ButtonProps,
  {
    fullWidth?: FormControlProps['fullWidth'];
    icon?: ReactNode;
    initialCount?: number;
    margin?: FormControlProps['margin'];
    variant?: FormControlProps['variant'];
  }
>;

function ListAdd({
  disabled,
  fullWidth = true,
  icon = '+',
  initialCount,
  margin = 'dense',
  name,
  readOnly,
  value,
  variant,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<
    { initialCount?: number; maxCount?: number },
    unknown[]
  >(parentName, { initialCount }, { absoluteName: true })[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant={variant}>
      <Button
        size="large"
        variant="outlined"
        {...filterDOMProps(props)}
        disabled={!limitNotReached}
        onClick={() => {
          if (!readOnly) {
            parent.onChange(parent.value!.concat([cloneDeep(value)]));
          }
        }}
      >
        {icon}
      </Button>
    </FormControl>
  );
}

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: 'leaf',
});
