// @flow
import type { Vector } from './hover'

export type Monitor = {
  getItem(): Object,
  getClientOffset(): Vector,
  isOver(config: ?Object): boolean,
  didDrop(): boolean,
  isDragging(): boolean
}

export type Connector = {
  dragSource(): Function,
  dropTarget(): Function
}
