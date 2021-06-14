export type Data = Record<string, unknown> | unknown;
export type CustomText = {
  text: string;
  data?: Data;
  type?: string;
};
