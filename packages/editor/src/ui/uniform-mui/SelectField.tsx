import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { SelectProps as MaterialSelectProps } from '@mui/material/Select';
import type { SwitchProps } from '@mui/material/Switch';
import Switch from '@mui/material/Switch';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import omit from 'lodash/omit';
import xor from 'lodash/xor';
import type { Ref } from 'react';
import React from 'react';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

type SelectFieldCommonProps = {
  allowedValues?: string[];
  appearance?: 'checkbox' | 'switch';
  disableItem?: (value: string) => boolean;
  inputRef?: Ref<HTMLButtonElement>;
  required?: boolean;
  transform?: (value: string) => string;
};

type CheckboxesProps = FieldProps<
  string | string[],
  CheckboxProps | SwitchProps,
  SelectFieldCommonProps & {
    checkboxes: true;
    legend?: string;
    variant?: undefined;
  }
>;

type SelectProps = FieldProps<
  string | string[],
  MaterialSelectProps & TextFieldProps,
  SelectFieldCommonProps & {
    checkboxes?: false;
    labelProps?: any;
    native?: boolean;
    textFieldProps?: Omit<TextFieldProps, 'value'>;
  }
>;

export type SelectFieldProps = CheckboxesProps | SelectProps;

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ (x) => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

// eslint-disable-next-line complexity
function Select(props: SelectFieldProps) {
  const value = props.value ?? '';

  if (props.checkboxes) {
    const {
      allowedValues,
      disabled,
      fieldType,
      id,
      inputRef,
      label,
      legend,
      name,
      onChange,
      readOnly,
      transform,
    } = props;

    const appearance = props.appearance ?? 'checkbox';
    const SelectionControl = appearance === 'checkbox' ? Checkbox : Switch;
    const filteredProps = omit(filterDOMProps(props), [
      'checkboxes' as never,
      'disableItem' as never,
      'id',
      'inputRef',
    ]);

    const children =
      fieldType !== Array ? (
        <RadioGroup
          id={id}
          name={name}
          onChange={(event) =>
            disabled || readOnly || onChange(event.target.value)
          }
          ref={inputRef}
          value={value ?? ''}
        >
          {allowedValues!.map((item) => (
            <FormControlLabel
              control={
                <Radio id={`${id}-${escape(item)}`} {...filteredProps} />
              }
              disabled={props.disableItem?.(item) || disabled}
              key={item}
              label={transform ? transform(item) : item}
              value={item}
            />
          ))}
        </RadioGroup>
      ) : (
        <FormGroup id={id}>
          {allowedValues!.map((item) => (
            <FormControlLabel
              control={
                <SelectionControl
                  checked={value.includes(item)}
                  id={`${id}-${escape(item)}`}
                  name={name}
                  onChange={() =>
                    disabled || readOnly || onChange(xor([item], value))
                  }
                  ref={inputRef}
                  value={name}
                  {...filteredProps}
                />
              }
              disabled={props.disableItem?.(item) || disabled}
              key={item}
              label={transform ? transform(item) : item}
            />
          ))}
        </FormGroup>
      );

    return wrapField(
      { ...props, component: 'fieldset' },
      (legend || label) && (
        <FormLabel component="legend">{legend || label}</FormLabel>
      ),
      children
    );
  }
  const {
    allowedValues,
    disabled,
    error,
    errorMessage,
    fieldType,
    fullWidth = true,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    label,
    labelProps,
    margin = 'dense',
    name,
    native,
    onChange,
    placeholder,
    readOnly,
    required,
    showInlineError,
    transform,
    variant,
    textFieldProps,
  } = props;

  const Item = native ? 'option' : MenuItem;
  const hasPlaceholder = !!placeholder;
  const hasValue = value !== '' && value !== undefined;
  const filteredProps = omit(filterDOMProps(props), [
    'checkboxes',
    'disableItem',
    'fullWidth',
    'helperText',
    'margin',
    'textFieldProps',
    'variant',
  ]);

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={fullWidth}
      helperText={(error && showInlineError && errorMessage) || helperText}
      InputLabelProps={{
        shrink: !!label && (hasPlaceholder || hasValue),
        ...labelProps,
        ...InputLabelProps,
      }}
      label={label}
      margin={margin}
      onChange={(event) =>
        disabled ||
        readOnly ||
        onChange(event.target.value !== '' ? event.target.value : undefined)
      }
      required={required}
      select
      SelectProps={{
        displayEmpty: hasPlaceholder,
        inputProps: { name, id, ...inputProps },
        multiple: fieldType === Array || undefined,
        native,
        ...filteredProps,
      }}
      value={native && !value ? '' : value}
      variant={variant}
      {...textFieldProps}
    >
      {(hasPlaceholder || !required || !hasValue) && (
        <Item value="" disabled={!!required}>
          {placeholder || label}
        </Item>
      )}

      {allowedValues!.map((value) => (
        <Item disabled={props.disableItem?.(value)} key={value} value={value}>
          {transform ? transform(value) : value}
        </Item>
      ))}
    </TextField>
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });
