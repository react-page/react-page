import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import type { Override } from 'uniforms';
export type ErrorsFieldProps = Override<FormHelperTextProps, {
    fullWidth?: boolean;
    margin?: 'dense' | 'normal' | 'none';
    variant?: 'standard' | 'outlined' | 'filled';
}>;
declare function ErrorsField({ children, fullWidth, margin, variant, ...props }: ErrorsFieldProps): JSX.Element | null;
export default ErrorsField;
//# sourceMappingURL=ErrorsField.d.ts.map