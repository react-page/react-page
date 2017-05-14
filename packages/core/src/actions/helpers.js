// @flow
import { v4 } from 'uuid'

export const gen = (c: number = 1) => {
  const ret = []
  for (let i = 0; i < c; i++) {
    ret.push(v4())
  }
  return ret
}
