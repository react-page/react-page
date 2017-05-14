// @flow
/* eslint no-use-before-define: "off" */
import type { Cell, Row } from '../../../types/editable'

export const isEmpty = ({
  cells,
  rows,
  layout: { plugin: { name: layout } = {} } = {},
  content: { plugin: { name: content } = {} } = {}
}: {
  cells: Array<Cell>,
  rows: Array<Row>,
  layout: Object,
  content: Object
}): boolean =>
  !(cells || []).filter(emptyFilter).length &&
  !(rows || []).filter(emptyFilter).length &&
  !content &&
  !(layout && (rows || []).filter(emptyFilter).length)

export const emptyFilter = (state: any): boolean => !isEmpty(state)
