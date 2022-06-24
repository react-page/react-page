import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';
import React, { createElement } from 'react';

export default function wrapField(
  {
    component,
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    margin,
    readOnly,
    required,
    showInlineError,
    variant,
  }: any,
  ...children: ReactNode[]
) {
  const formHelperText = showInlineError && error ? errorMessage : helperText;
  const props = {
    component,
    disabled: !!disabled,
    error: !!error,
    fullWidth: !!fullWidth,
    margin,
    readOnly,
    required,
    variant,
  };

  return createElement(
    FormControl,
    props,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>
  );
}
