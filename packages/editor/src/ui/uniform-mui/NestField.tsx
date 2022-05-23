import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import type { HTMLFieldProps } from 'uniforms';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

// FIXME: wrapField is not typed correctly.
export type NestFieldProps = HTMLFieldProps<
  Record<string, any>,
  HTMLDivElement,
  {
    helperText?: string;
    itemProps?: Record<string, any>;
    fullWidth?: boolean;
    margin?: any;
  }
>;

function Nest({
  children,
  fields,
  fullWidth = true,
  itemProps,
  label,
  margin = 'dense',
  ...props
}: NestFieldProps) {
  return wrapField(
    {
      fullWidth,
      margin,
      ...props,
      component: undefined,
    },
    label && <FormLabel component="legend">{label}</FormLabel>,
    children ||
      fields.map((field) => (
        <AutoField key={field} name={field} {...itemProps} />
      ))
  );
}

export default connectField<NestFieldProps>(Nest);
