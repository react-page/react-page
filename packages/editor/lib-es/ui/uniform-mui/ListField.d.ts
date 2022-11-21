import type { ListProps } from '@mui/material/List';
import type { ReactNode } from 'react';
import type { FieldProps } from 'uniforms';
export type ListFieldProps = FieldProps<unknown[], ListProps, {
    addIcon?: ReactNode;
    initialCount?: number;
    itemProps?: Record<string, any>;
}>;
declare const _default: import("uniforms").ConnectedField<import("uniforms").GuaranteedProps<unknown[]> & {
    addIcon?: ReactNode;
    initialCount?: number | undefined;
    itemProps?: Record<string, any> | undefined;
} & Omit<ListProps<"ul", {}>, "initialCount" | keyof import("uniforms").GuaranteedProps<unknown[]> | "addIcon" | "itemProps">, unknown[] | undefined>;
export default _default;
//# sourceMappingURL=ListField.d.ts.map