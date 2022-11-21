/// <reference types="react" />
export declare const ColorPicker: import("react").ForwardRefExoticComponent<import("./types").ColorPickerProps & {
    fallback?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
} & import("react").RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export declare const ColorPickerField: import("react").ForwardRefExoticComponent<{
    label?: string | boolean | null | undefined;
    name: string;
    placeholder?: unknown;
} & Omit<Partial<import("uniforms").GuaranteedProps<string>>, "name" | "label" | "placeholder"> & Omit<{
    value: string;
    label: string;
    onChange: (v: string | void) => void;
}, "id" | "onChange" | "readOnly" | "value" | "disabled" | "name" | "label" | "placeholder" | "error" | "errorMessage" | "showInlineError" | "changed" | "field" | "fieldType" | "fields"> & {
    fallback?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
} & import("react").RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export * from './colorToString';
export * from './types';
//# sourceMappingURL=index.d.ts.map