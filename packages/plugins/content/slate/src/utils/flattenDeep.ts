// tslint:disable-next-line:no-any
export default function flattenDeep<T>(arr1: any): T[] {
  if (!Array.isArray(arr1)) {
    return [arr1];
  }
  return arr1.reduce(
    // tslint:disable-next-line:no-any
    (acc: T[], val: any) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
