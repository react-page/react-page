/* eslint-disable @typescript-eslint/ban-types */
type CommonPropertyProps = {
  title?: string;
  uniforms?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
type BooleanType = {
  type: 'boolean';
} & CommonPropertyProps;
type StringProperty = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
} & CommonPropertyProps;

type NumberProperty = {
  type: 'number' | 'integer';
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: boolean;
} & CommonPropertyProps;

type ObjectProperty<T extends object> = JsonSchema<T> & CommonPropertyProps;
type ArrayProperty<T> = {
  type: 'array';
  items: JsonSchemaProperty<T>;
};
export type JsonSchemaProperty<T> = T extends (infer U)[]
  ? ArrayProperty<U>
  : T extends object
  ? ObjectProperty<T>
  : T extends string
  ? StringProperty
  : T extends number
  ? NumberProperty
  : T extends boolean
  ? BooleanType
  : never;

export type JsonSchema<T extends object> = {
  title?: string;
  type: 'object';
  properties: { [K in keyof T]-?: JsonSchemaProperty<T[K]> };
  // required: string[];
  /** union to tuple conversion is expensive, we do a poor mans version here */
  required: Array<keyof T>;
};
