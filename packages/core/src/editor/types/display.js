// @flow
export type Display = {
  previous: string,
  mode: string
}

export type DisplayAction = {
  type: string,
  mode: string,
  fallback: string,
  remember: boolean
}
