// @flow
import uuid from 'node-uuid'

export const gen = (c: number = 1) => {
  const ret = []
  for (let i = 0; i < c; i++) {
    ret.push(uuid.v4())
  }
  return ret
}
