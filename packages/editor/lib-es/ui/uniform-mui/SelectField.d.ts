import type { CheckboxProps } from '@mui/material/Checkbox';
import type { SelectProps as MaterialSelectProps } from '@mui/material/Select';
import type { SwitchProps } from '@mui/material/Switch';
import type { TextFieldProps } from '@mui/material/TextField';
import type { Ref } from 'react';
import type { FieldProps } from 'uniforms';
type SelectFieldCommonProps = {
    allowedValues?: string[];
    appearance?: 'checkbox' | 'switch';
    disableItem?: (value: string) => boolean;
    inputRef?: Ref<HTMLButtonElement>;
    required?: boolean;
    transform?: (value: string) => string;
};
type CheckboxesProps = FieldProps<string | string[], CheckboxProps | SwitchProps, SelectFieldCommonProps & {
    checkboxes: true;
    legend?: string;
    variant?: undefined;
}>;
type SelectProps = FieldProps<string | string[], MaterialSelectProps & TextFieldProps, SelectFieldCommonProps & {
    checkboxes?: false;
    labelProps?: any;
    native?: boolean;
    textFieldProps?: Omit<TextFieldProps, 'value'>;
}>;
export type SelectFieldProps = CheckboxesProps | SelectProps;
declare const _default: import("uniforms").ConnectedField<SelectFieldProps, string | string[] | undefined>;
export default _default;
//# sourceMappingURL=SelectField.d.ts.map