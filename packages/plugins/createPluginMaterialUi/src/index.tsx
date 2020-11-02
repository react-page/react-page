import createPlugin from './createPlugin';
import makeUniformsSchema from './utils/makeUniformsSchema';
import { JsonSchema, JsonSchemaProperty } from './types/jsonSchema';

// legacy
const createContentPlugin = createPlugin;
const createLayoutPlugin = createPlugin;

export {
  createPlugin,
  createContentPlugin,
  createLayoutPlugin,
  makeUniformsSchema,
  JsonSchema,
  JsonSchemaProperty,
};
