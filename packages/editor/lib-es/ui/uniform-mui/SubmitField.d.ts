import type { ButtonProps } from '@mui/material/Button';
import type { ReactNode, Ref } from 'react';
import type { Override } from 'uniforms';
export type SubmitFieldProps = Override<ButtonProps, {
    inputRef?: Ref<any>;
    label?: ReactNode;
}>;
declare function SubmitField({ children, disabled, inputRef, label, value, ...props }: SubmitFieldProps): JSX.Element;
export default SubmitField;
//# sourceMappingURL=SubmitField.d.ts.map