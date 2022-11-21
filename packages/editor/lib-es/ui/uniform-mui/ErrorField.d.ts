import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { Override } from 'uniforms';
export type ErrorFieldProps = Override<FormHelperTextProps, {
    errorMessage?: string;
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
}>;
declare const _default: import("uniforms").ConnectedField<{
    errorMessage?: string | undefined;
    fullWidth?: boolean | undefined;
    margin?: "normal" | "none" | "dense" | undefined;
} & Omit<FormHelperTextProps<"p", {}>, "margin" | "fullWidth" | "errorMessage">, unknown>;
export default _default;
//# sourceMappingURL=ErrorField.d.ts.map