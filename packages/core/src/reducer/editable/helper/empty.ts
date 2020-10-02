import { Cell, Row } from '../../../types/editable';

export const isEmpty = ({
  cells,
  rows,
  layout: { plugin: { name: layout = undefined } = {} } = {},
  content: { plugin: { name: content = undefined } = {} } = {},
}: {
  cells: Array<Cell>;
  rows: Array<Row>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout?: { plugin?: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: { plugin?: any };
}): boolean =>
  !(cells || []).filter(emptyFilter).length &&
  !(rows || []).filter(emptyFilter).length &&
  !content &&
  !(layout && (rows || []).filter(emptyFilter).length);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyFilter = (state: any): boolean => !isEmpty(state);
