// @flow
import type { Vector } from './hover'

export type Monitor = {
  getItem(): Object,
  getClientOffset(): Vector
}
