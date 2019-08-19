import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: JSONSchema7) {
  const validator = ajv.compile(schema);
  // tslint:disable-next-line:no-any
  return (model: any) => {
    validator(model);
    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}

export default (jsonSchema: JSONSchema7) => {
  const fullSchema: JSONSchema7 = {
    type: 'object',
    ...jsonSchema,
  };
  return new JSONSchemaBridge(fullSchema, createValidator(fullSchema));
};
