import {
  AbstractCell,
  AbstractEditable,
  Cell,
  Config,
  EditableType,
  Row,
} from '../../types/editable';
import { RootState } from '../../types/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeInner = <T extends { id: string; rows?: Row[]; cells?: Cell[] }>(
  current: Cell & Row,
  props: { id: string }
): Cell | Row => {
  const { id, rows = [], cells = [] } = current;
  if (id === props.id) {
    return current;
  }

  let found: Cell | Row = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [...rows, ...cells].find((n) => {
    const f = nodeInner(n, props);
    if (f) {
      found = f;
    }
    return Boolean(f);
  });

  return found;
};

export const editable = (
  state: RootState,
  { id }: { id: string }
): AbstractEditable<AbstractCell<Row>> =>
  state &&
  state.reactPage &&
  state.reactPage.editables &&
  state.reactPage.editables.present.find(
    ({ id: current }: EditableType = {} as EditableType) => current === id
  );

export const editables = ({
  reactPage: {
    editables: { present },
  },
}: RootState) => present;

export const purifiedEditable = (state: RootState, props: EditableType) => {
  const found = editable(state, props);

  if (!found) {
    return null;
  }

  return {
    ...found,
    cells: (found.cells || []).map((c: Cell | string) =>
      typeof c === 'string' ? c : c.id
    ),
  };
};

export const editableConfig = (
  state: RootState,
  { editable: id }: { editable: string }
): Config => editable(state, { id }).config;

export type NodeProps = { id: string; editable: string };

export const node = (
  state: RootState,
  props: NodeProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Cell | Row => {
  const tree = editable(state, { id: props.editable });
  if (!tree) {
    throw new Error(`Could not find editable: ${props.editable}`);
  }

  return { ...nodeInner(tree, props) };
};

export const searchNodeEverywhere = (state: RootState, id: string) => {
  for (let i = 0; i < state.reactPage.editables.present.length; i++) {
    const n = node(state, {
      id,
      editable: state.reactPage.editables.present[i].id,
    });
    if (n.id) {
      return {
        node: n,
        editable: state.reactPage.editables.present[i],
      };
    }
  }

  return null;
};

export const purifiedNode = (
  state: RootState,
  props: { id: string; editable: string }
): Row | Cell => {
  const found = node(state, props);

  if (!found) {
    return null;
  }

  if ((found as Row).cells) {
    (found as Row).cells = (found as Row).cells.map(
      (c: Cell): string => c.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
  }

  if ((found as Cell).rows) {
    (found as Cell).rows = (found as Cell).rows.map(
      (r: Row): string => r.id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
  }

  return found;
};
