import { RGBColor } from './types';
export const colorToString = (c: RGBColor) =>
  c && 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';
