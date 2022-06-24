import FormControl from '@mui/material/FormControl';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';
import type { Override } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  FormHelperTextProps,
  {
    errorMessage?: string;
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
  }
>;

function Error({
  children,
  error,
  errorMessage,
  fullWidth,
  margin,
  variant,
  ...props
}: ErrorFieldProps) {
  return !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={!!fullWidth}
      margin={margin === 'dense' ? margin : undefined}
      variant={variant}
    >
      <FormHelperText {...filterDOMProps(props)}>
        {children || errorMessage}
      </FormHelperText>
    </FormControl>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: 'leaf',
});
