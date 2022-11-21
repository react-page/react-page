import React from 'react';
import type { AutoformControlsDef, CellPluginComponentProps, DataTType } from '../../core/types';
export declare const AutoForm: React.ForwardRefExoticComponent<Pick<Omit<import("uniforms").AutoFormProps<unknown>, "label" | "noValidate" | "error" | "validate" | "autosave" | "autosaveDelay" | "onValidate"> & Partial<import("uniforms").AutoFormProps<unknown>> & {
    children?: React.ReactNode;
} & React.RefAttributes<any> & {
    fallback?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}, "children" | "key" | "fallback" | "validate" | "autoField" | "onValidate" | keyof import("uniforms").BaseFormProps<unknown> | "errorsField" | "submitField" | "validator" | "onChangeModel"> & React.RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export declare const AutoField: React.ForwardRefExoticComponent<Pick<import("uniforms").AutoFieldProps & {
    fallback?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}, keyof import("uniforms").AutoFieldProps> & React.RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
export declare const AutoFields: React.ForwardRefExoticComponent<import("../uniform-mui").AutoFieldsProps & {
    fallback?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
} & React.RefAttributes<unknown>> & {
    load: () => Promise<unknown>;
};
type Props<T extends DataTType> = CellPluginComponentProps<T> & AutoformControlsDef<T>;
export declare function AutoformControls<T extends DataTType>(props: Props<T>): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map