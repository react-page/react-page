import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = FieldProps<string, MUITextFieldProps>;

function Text({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  type = 'text',
  value = '',
  ...props
}: TextFieldProps) {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ readOnly }}
      label={label}
      margin="dense"
      name={name}
      onChange={(event) => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
