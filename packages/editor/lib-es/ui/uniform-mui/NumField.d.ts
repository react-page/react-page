import type { TextFieldProps } from '@mui/material/TextField';
import type { FieldProps } from 'uniforms';
export type NumFieldProps = FieldProps<number, TextFieldProps, {
    decimal?: boolean;
    max?: number;
    min?: number;
    step?: number;
}>;
declare const _default: import("uniforms").ConnectedField<NumFieldProps, number | undefined>;
export default _default;
//# sourceMappingURL=NumField.d.ts.map