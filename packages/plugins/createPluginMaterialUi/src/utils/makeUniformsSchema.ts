import Ajv from 'ajv';
import { JsonSchema } from '../types/jsonSchema';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator<T extends object>(schema: JsonSchema<T>) {
  const validator = ajv.compile(schema);
  // tslint:disable-next-line:no-any
  return (model: any) => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}

function makeUniformsSchema<T extends {}>(
  jsonSchema: Omit<JsonSchema<T>, 'type'>
) {
  const fullSchema: JsonSchema<T> = {
    type: 'object',
    ...jsonSchema,
  };
  return new JSONSchemaBridge(fullSchema, createValidator(fullSchema));
}

export default makeUniformsSchema;
