import type { ComponentType } from 'react';
import { createElement } from 'react';
import { useForm } from 'uniforms';

import AutoField from './AutoField';

export type AutoFieldsProps = {
  autoField?: ComponentType<{ name: string }>;
  element?: ComponentType | string;
  fields?: string[];
  omitFields?: string[];
  showInlineError?: boolean;
};

export default function AutoFields({
  autoField = AutoField,
  element = 'div',
  fields,
  omitFields = [],
  showInlineError,
  ...props
}: AutoFieldsProps) {
  const { schema } = useForm();

  return createElement(
    element,
    props,
    (fields ?? schema.getSubfields())
      .filter((field) => !omitFields.includes(field))
      .map((field) =>
        createElement(
          autoField,
          Object.assign(
            { key: field, name: field },
            showInlineError === undefined ? null : { showInlineError }
          )
        )
      )
  );
}
