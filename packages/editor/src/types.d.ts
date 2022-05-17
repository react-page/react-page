declare module 'color-parse' {
  function parse(color: string): {
    space: 'hsl' | 'rgb';
    values: [number, number, number];
    alpha: number;
  };
  export default parse;
}
