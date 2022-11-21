/// <reference types="react" />
export declare const RaReactPageInput: import("react").ForwardRefExoticComponent<{
    label?: string | undefined;
    source: string;
    style?: import("react").CSSProperties | undefined;
} & {
    value?: import("@react-page/editor").ValueWithLegacy | null | undefined;
    readOnly?: boolean | undefined;
    lang?: string | undefined;
} & import("@react-page/editor").Options & import("@react-page/editor").Callbacks & import("@react-page/editor").RenderOptions & {
    fallback?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
} & import("react").RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export declare const RaSelectReferenceInputField: import("react").ForwardRefExoticComponent<Omit<{
    allowEmpty?: boolean | undefined;
    className?: string | undefined;
    filterToQuery?: ((filter: string) => any) | undefined;
    label?: string | boolean | null | undefined;
    perPage?: number | undefined;
    reference: string;
    name: string;
} & Pick<import("ra-core").ChoicesProps, "optionText" | "optionValue">, "children"> & {
    fallback?: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
} & import("react").RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
//# sourceMappingURL=index.d.ts.map