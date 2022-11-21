import type { ComponentType } from 'react';
export type AutoFieldsProps = {
    autoField?: ComponentType<{
        name: string;
    }>;
    element?: ComponentType | string;
    fields?: string[];
    omitFields?: string[];
    showInlineError?: boolean;
};
export default function AutoFields({ autoField, element, fields, omitFields, showInlineError, ...props }: AutoFieldsProps): import("react").ReactElement<{}, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=AutoFields.d.ts.map