// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function flattenDeep<T>(arr1: any): T[] {
  if (!Array.isArray(arr1)) {
    return [arr1];
  }
  return arr1.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: T[], val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
