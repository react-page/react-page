import type { TextFieldProps } from '@mui/material/TextField';
import type { FieldProps } from 'uniforms';
export type DateFieldProps = FieldProps<Date, TextFieldProps, {
    labelProps?: Record<string, string>;
}>;
declare const _default: import("uniforms").ConnectedField<DateFieldProps, Date | undefined>;
export default _default;
//# sourceMappingURL=DateField.d.ts.map