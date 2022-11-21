import type { IconButtonProps } from '@mui/material/IconButton';
import type { ReactNode } from 'react';
import type { FieldProps } from 'uniforms';
export type ListDelFieldProps = FieldProps<unknown, IconButtonProps, {
    icon?: ReactNode;
}>;
declare const _default: import("uniforms").ConnectedField<import("uniforms").GuaranteedProps<unknown> & {
    icon?: ReactNode;
} & Omit<IconButtonProps<"button", {}>, "icon" | keyof import("uniforms").GuaranteedProps<unknown>>, unknown>;
export default _default;
//# sourceMappingURL=ListDelField.d.ts.map