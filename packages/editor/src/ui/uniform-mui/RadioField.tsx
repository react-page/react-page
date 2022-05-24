import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import type { RadioProps } from '@mui/material/Radio';
import RadioMaterial from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import omit from 'lodash/omit';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: 'dense' | 'normal' | 'none';
    row?: boolean;
    transform?: (value: string) => string;
  }
>;

function Radio({
  allowedValues,
  disabled,
  fullWidth = true,
  id,
  inputRef,
  label,
  margin = 'dense',
  name,
  onChange,
  readOnly,
  row,
  transform,
  value,
  ...props
}: RadioFieldProps) {
  return wrapField(
    { ...props, component: 'fieldset', disabled, fullWidth, margin },
    label && (
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
    ),
    <RadioGroup
      id={id}
      name={name}
      onChange={(event: any) =>
        disabled || readOnly || onChange(event.target.value)
      }
      ref={inputRef}
      row={row}
      value={value ?? ''}
    >
      {allowedValues?.map((item) => (
        <FormControlLabel
          control={
            <RadioMaterial
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
