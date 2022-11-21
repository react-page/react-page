import type { ChoicesProps } from 'react-admin';
import React from 'react';
type InputProps = {
    allowEmpty?: boolean;
    className?: string;
    filterToQuery?: (filter: string) => any;
    label?: string | boolean | null;
    perPage?: number;
    reference: string;
    name: string;
};
type Props = InputProps & Pick<ChoicesProps, 'optionText' | 'optionValue'>;
/**
 * RaSelectReferenceInputField can be used in an autoform to
 */
declare const RaSelectReferenceInputField: React.FC<Omit<Props, 'children'>>;
export default RaSelectReferenceInputField;
//# sourceMappingURL=RaSelectReferenceInputField.d.ts.map