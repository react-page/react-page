import type React from 'react';
import type { DataTType } from '.';

type UniformsProps<FullData> = Record<string, unknown> & {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  component?: React.ComponentType<{ name: string }>;
  /**
   * whether to show the field
   */
  showIf?: (data: FullData) => boolean;
};

type WithEnum<FieldT> = {
  /**
   * If you want to show a list of possible values, specify the enum prop.
   * The values will be shown in a select field
   */
  enum?: FieldT[];
};
type CommonPropertyProps<FullData> = {
  /**
   * title to display
   */
  title?: string;
  /**
   * uniforms properties, passed to the form field
   */
  uniforms?: UniformsProps<FullData>;

  /**
   * additionl props
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
type BooleanType<FullData> = {
  /**
   * boolean type is for checkboxes
   */
  type: 'boolean';
  /**
   * default value
   */
  default?: boolean;
} & CommonPropertyProps<FullData>;

type StringProperty<FullData> = {
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
} & CommonPropertyProps<FullData> &
  WithEnum<string>;

type NumberProperty<FullData> = {
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
} & CommonPropertyProps<FullData> &
  WithEnum<number>;

type BaseObjectProps<FieldData extends Record<string, unknown>, FullData> = {
  title?: string;
  /**
   * type object is for a nested object
   */
  type?: 'object';
  /**
   * the default value
   */
  default?: FieldData;
  /**
   * child properties of this object
   */
  properties: {
    [Field in keyof FieldData]?: JsonSchemaProperty<FieldData[Field], FullData>;
  };
  // required: string[];
  /* union to tuple conversion is expensive, we do a poor mans version here */
  /**
   * required fields
   */
  required?: Array<keyof FieldData>;
};

type ObjectProperty<
  FieldData extends Record<string, unknown>,
  FullData
> = BaseObjectProps<FieldData, FullData> & CommonPropertyProps<FullData>;
type ArrayProperty<Field, Data> = {
  /**
   * array type is for array objects
   */
  type: 'array';
  /**
   * shape of one array item
   */
  items: JsonSchemaProperty<Field, Data>;
} & CommonPropertyProps<Data>;
export type JsonSchemaProperty<Field, Data> = Field extends (infer U)[]
  ? ArrayProperty<U, Data>
  : Field extends Record<string, unknown>
  ? ObjectProperty<Field, Data>
  : Field extends string
  ? StringProperty<Data>
  : Field extends number
  ? NumberProperty<Data>
  : Field extends boolean
  ? BooleanType<Data>
  : never;

export type JsonSchema<Data extends DataTType> = BaseObjectProps<Data, Data>;
