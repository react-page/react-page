// @flow
export const getSetting = (key: string) => ({ settings }: Object) =>
  settings[key]
