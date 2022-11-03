/* eslint-disable @typescript-eslint/ban-types */

import Ajv from 'ajv';

import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import type { DataTType, JsonSchema } from '../../core/types';
const ajv = new Ajv({ allErrors: true, useDefaults: true });
ajv.addKeyword('uniforms');

function createValidator<T extends DataTType>(schema: JsonSchema<T>) {
  const validator = ajv.compile(schema);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (model: any) => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      return validator.errors?.length ? { details: validator.errors } : null;
    }
  };
}

function makeUniformsSchema<T extends DataTType>(
  jsonSchema: Omit<JsonSchema<T>, 'type'>
) {
  const fullSchema: JsonSchema<T> = {
    type: 'object',
    ...jsonSchema,
  };
  const bridge = new JSONSchemaBridge(fullSchema, createValidator(fullSchema));

  // see https://github.com/react-page/react-page/issues/1187
  // we remap props.component to props._customComponent to avoid the underlying issue in uniforms
  //
  const getPropsOrg = bridge.getProps;
  bridge.getProps = function (name: string) {
    const { component, ...props } = getPropsOrg.call(this, name);
    if (component) {
      return {
        _customComponent: component,
        ...props,
      };
    }
    return props;
  };
  return bridge;
}

export default makeUniformsSchema;
