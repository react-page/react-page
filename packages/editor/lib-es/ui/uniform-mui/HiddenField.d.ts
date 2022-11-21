import type { HTMLProps, Ref } from 'react';
import type { Override } from 'uniforms';
export type HiddenFieldProps = Override<HTMLProps<HTMLInputElement>, {
    inputRef?: Ref<HTMLInputElement>;
    name: string;
    noDOM?: boolean;
    value?: any;
}>;
export default function HiddenField({ value, ...rawProps }: HiddenFieldProps): JSX.Element | null;
//# sourceMappingURL=HiddenField.d.ts.map