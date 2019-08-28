type CommonPropertyProps = {
  title?: string;
  uniforms?: object;
  // tslint:disable-next-line:no-any
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

type Property<T> = T extends object
  ? JsonSchema<T>
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
  properties: { [K in keyof T]-?: Property<T[K]> };
  // required: string[];
  /** union to tuple conversion is expensive, we do a poor mans version here */
  required: Array<keyof T>;
};
