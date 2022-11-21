import type { CheckboxProps } from '@mui/material/Checkbox';
import type { SwitchProps } from '@mui/material/Switch';
import type { FieldProps } from 'uniforms';
export type BoolFieldProps = FieldProps<boolean, CheckboxProps | SwitchProps, {
    appearance?: 'checkbox' | 'switch';
    fullWidth?: boolean;
    helperText?: string;
    legend?: string;
    margin?: 'dense' | 'normal' | 'none';
    transform?: (label: string) => string;
}>;
declare const _default: import("uniforms").ConnectedField<BoolFieldProps, boolean | undefined>;
export default _default;
//# sourceMappingURL=BoolField.d.ts.map