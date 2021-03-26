/* eslint-disable @typescript-eslint/ban-types */
type CommonPropertyProps = {
  /**
   * title to display
   */
  title?: string;
  /**
   * uniforms properties, passed to the form field
   */
  uniforms?: Record<string, unknown>;
  /**
   * additionl props
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
type BooleanType = {
  /**
   * boolean type is for checkboxes
   */
  type: 'boolean';
  /**
   * default value
   */
  default?: boolean;
} & CommonPropertyProps;

type StringProperty = {
  /**
   * string type is for strings and render an input field
   */
  type: 'string';
  /**
   * default value
   */
  default?: string;
  /**
   * min required length
   */
  minLength?: number;
  /**
   * max allowed length
   */
  maxLength?: number;
  /**
   * regex pattern to validate, e.g. for email adresses
   */
  pattern?: string;
} & CommonPropertyProps;

type NumberProperty = {
  /**
   * type number is for float numbers, integer is for integers only
   */
  type: 'number' | 'integer';
  /**
   * the dfault value
   */
  default?: number;
  /**
   * min value
   */
  minimum?: number;
  /**
   * max value
   */
  maximum?: number;
  /**
   * should it be a multiple of something
   */
  multipleOf?: number;
  /**
   * maximum but value has to be strictly smaller than this maximum
   */
  exclusiveMaximum?: boolean;
} & CommonPropertyProps;

type ObjectProperty<T extends Record<string, unknown>> = JsonSchema<T> &
  CommonPropertyProps;
type ArrayProperty<T> = {
  /**
   * array type is for array objects
   */
  type: 'array';
  /**
   * shape of one array item
   */
  items: JsonSchemaProperty<T>;
};
export type JsonSchemaProperty<T> = T extends (infer U)[]
  ? ArrayProperty<U>
  : T extends Record<string, unknown>
  ? ObjectProperty<T>
  : T extends string
  ? StringProperty
  : T extends number
  ? NumberProperty
  : T extends boolean
  ? BooleanType
  : never;

export type JsonSchema<T extends Record<string, unknown> | unknown> = {
  title?: string;
  /**
   * type object is for a nested object
   */
  type?: 'object';
  /**
   * the default value
   */
  default?: T;
  /**
   * child properties of this object
   */
  properties: { [K in keyof T]?: JsonSchemaProperty<T[K]> };
  // required: string[];
  /* union to tuple conversion is expensive, we do a poor mans version here */
  /**
   * required fields
   */
  required: Array<keyof T>;
};
