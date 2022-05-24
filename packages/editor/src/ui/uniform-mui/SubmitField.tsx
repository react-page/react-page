import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ReactNode, Ref } from 'react';
import React from 'react';
import type { Override } from 'uniforms';
import { filterDOMProps, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  ButtonProps,
  // FIXME: What kind of `ref` is it?
  { inputRef?: Ref<any>; label?: ReactNode }
>;

function SubmitField({
  children,
  disabled,
  inputRef,
  label = 'Submit',
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      value={value}
      variant="contained"
      {...filterDOMProps(props)}
    >
      {children || label}
    </Button>
  );
}

export default SubmitField;
