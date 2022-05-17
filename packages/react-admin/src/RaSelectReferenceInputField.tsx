/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChoicesProps } from 'react-admin';
import { ReferenceInput, SelectInput } from 'react-admin';
import { connectField } from 'uniforms';
import React from 'react';

type InputProps = {
  allowEmpty?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
const RaSelectReferenceInputField: React.FC<Omit<Props, 'children'>> =
  connectField(
    ({
      allowEmpty = true,
      value = null as any,
      onChange,
      optionText,
      optionValue,
      label,
      ...props
    }: Props & { value: string; onChange: (s: string) => void }) => {
      return (
        <ReferenceInput
          label={label as string}
          reference={props.reference}
          perPage={props.perPage}
          allowEmpty={allowEmpty}
          meta={{}}
          input={
            {
              value,
              onChange: (e: any) => {
                onChange(e.target.value);
              },
            } as any
          }
          source={null as any}
        >
          <SelectInput
            optionText={optionText || 'id'}
            emptyValue={null}
            optionValue={optionValue || 'id'}
            options={{ value }}
          />
        </ReferenceInput>
      );
    }
  );

export default RaSelectReferenceInputField;
