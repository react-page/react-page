// @flow
import uuid from 'uuid/v4'

export const gen = (c: number = 1) => {
  const ret = []
  for (let i = 0; i < c; i++) {
    ret.push(uuid())
  }
  return ret
}
