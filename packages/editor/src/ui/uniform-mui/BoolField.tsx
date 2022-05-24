import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import type { SwitchProps } from '@mui/material/Switch';
import Switch from '@mui/material/Switch';
import omit from 'lodash/omit';
import type { Ref } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps | SwitchProps,
  {
    appearance?: 'checkbox' | 'switch';
    fullWidth?: boolean;
    helperText?: string;
    legend?: string;
    margin?: 'dense' | 'normal' | 'none';
    transform?: (label: string) => string;
  }
>;

function Bool(props: BoolFieldProps) {
  const {
    appearance,
    disabled,
    inputRef,
    label,
    legend,
    name,
    onChange,
    readOnly,
    transform,
    value,
  } = props;
  const SelectionControl =
    appearance === 'checkbox' || appearance === undefined ? Checkbox : Switch;

  return wrapField(
    { fullWidth: true, ...props },
    legend && (
      <FormLabel component="legend" htmlFor={name}>
        {legend}
      </FormLabel>
    ),
    <FormGroup>
      <FormControlLabel
        control={
          <SelectionControl
            checked={!!value}
            name={name}
            onChange={(event) =>
              !disabled &&
              !readOnly &&
              onChange &&
              onChange(event.target.checked)
            }
            ref={inputRef as Ref<HTMLButtonElement>}
            value={name}
            {...omit(filterDOMProps(props), ['helperText', 'fullWidth'])}
          />
        }
        label={transform ? transform(label as string) : label}
      />
    </FormGroup>
  );
}

export default connectField<BoolFieldProps>(Bool, { kind: 'leaf' });
