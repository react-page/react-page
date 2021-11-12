/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'deep-rename-keys' {
  function rename(obj: any, cb: (key: string) => string): any;
  export default rename;
}
