import type { RGBColor } from './types';
import parse from 'color-parse';
export const colorToString = (c: RGBColor) =>
  c && 'rgba(' + c.r + ', ' + c.g + ', ' + c.b + ', ' + c.a + ')';

export const stringToColor = (c: string) => {
  const match = parse(c);

  if (!match || match.space !== 'rgb') return null;
  return {
    r: match.values[0],
    g: match.values[1],
    b: match.values[2],
    a: match.alpha,
  };
};
