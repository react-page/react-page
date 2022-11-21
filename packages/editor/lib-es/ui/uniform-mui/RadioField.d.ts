import type { RadioProps } from '@mui/material/Radio';
import type { FieldProps } from 'uniforms';
export type RadioFieldProps = FieldProps<string, RadioProps, {
    allowedValues?: string[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: 'dense' | 'normal' | 'none';
    row?: boolean;
    transform?: (value: string) => string;
}>;
declare const _default: import("uniforms").ConnectedField<import("uniforms").GuaranteedProps<string> & {
    allowedValues?: string[] | undefined;
    checkboxes?: boolean | undefined;
    fullWidth?: boolean | undefined;
    helperText?: string | undefined;
    margin?: "normal" | "none" | "dense" | undefined;
    row?: boolean | undefined;
    transform?: ((value: string) => string) | undefined;
} & Omit<RadioProps, "row" | "transform" | "margin" | "fullWidth" | "helperText" | "allowedValues" | keyof import("uniforms").GuaranteedProps<string> | "checkboxes">, string | undefined>;
export default _default;
//# sourceMappingURL=RadioField.d.ts.map