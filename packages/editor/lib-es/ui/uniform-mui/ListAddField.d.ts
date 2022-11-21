import type { ButtonProps } from '@mui/material/Button';
import type { FormControlProps } from '@mui/material/FormControl';
import type { ReactNode } from 'react';
import type { FieldProps } from 'uniforms';
export type ListAddFieldProps = FieldProps<unknown, ButtonProps, {
    fullWidth?: FormControlProps['fullWidth'];
    icon?: ReactNode;
    initialCount?: number;
    margin?: FormControlProps['margin'];
    variant?: FormControlProps['variant'];
}>;
declare const _default: import("uniforms").ConnectedField<import("uniforms").GuaranteedProps<unknown> & {
    fullWidth?: boolean | undefined;
    icon?: ReactNode;
    initialCount?: number | undefined;
    margin?: "normal" | "none" | "dense" | undefined;
    variant?: "filled" | "standard" | "outlined" | undefined;
} & Omit<ButtonProps<"button", {}>, "icon" | "variant" | "margin" | "fullWidth" | "initialCount" | keyof import("uniforms").GuaranteedProps<unknown>>, unknown>;
export default _default;
//# sourceMappingURL=ListAddField.d.ts.map