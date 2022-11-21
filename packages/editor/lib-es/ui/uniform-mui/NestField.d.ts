import type { HTMLFieldProps } from 'uniforms';
export type NestFieldProps = HTMLFieldProps<Record<string, any>, HTMLDivElement, {
    helperText?: string;
    itemProps?: Record<string, any>;
    fullWidth?: boolean;
    margin?: any;
}>;
declare const _default: import("uniforms").ConnectedField<NestFieldProps, Record<string, any> | undefined>;
export default _default;
//# sourceMappingURL=NestField.d.ts.map