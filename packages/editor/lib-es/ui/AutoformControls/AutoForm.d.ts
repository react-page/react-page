import type { ReactNode } from 'react';
import React from 'react';
import type { AutoFormProps } from 'uniforms';
type OptionalFields = 'autosaveDelay' | 'error' | 'label' | 'noValidate' | 'onValidate' | 'validate' | 'autosave';
declare const _default: React.ForwardRefExoticComponent<Omit<AutoFormProps<unknown>, OptionalFields> & Partial<AutoFormProps<unknown>> & {
    children?: ReactNode;
} & React.RefAttributes<any>>;
export default _default;
//# sourceMappingURL=AutoForm.d.ts.map