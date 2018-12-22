/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

import {
  EditableType,
  Cell,
  Row,
  Config,
  AbstractEditable,
  AbstractCell
} from '../../types/editable';
import { RootState } from '../../types/state';

// tslint:disable-next-line:no-any
const nodeInner = <T extends { id: string; rows?: Row[]; cells?: Cell[] }>(
  current: Cell & Row,
  props: { id: string }
): Cell | Row => {
  const { id, rows = [], cells = [] } = current;
  if (id === props.id) {
    return current;
  }

  let found: Cell | Row = undefined;
  // tslint:disable-next-line:no-any
  [...rows, ...cells].find(n => {
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
  state.ory &&
  state.ory.editables &&
  state.ory.editables.present.find(
    ({ id: current }: EditableType = {} as EditableType) => current === id
  );

export const editables = ({
  ory: {
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
  // tslint:disable-next-line:no-any
): Cell | Row => {
  const tree = editable(state, { id: props.editable });
  if (!tree) {
    throw new Error(`Could not find editable: ${props.editable}`);
  }

  return { ...nodeInner(tree, props) };
};

export const searchNodeEverywhere = (state: RootState, id: string) => {
  for (let i = 0; i < state.ory.editables.present.length; i++) {
    const n = node(state, { id, editable: state.ory.editables.present[i].id });
    if (n.id) {
      return {
        node: n,
        editable: state.ory.editables.present[i],
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
      // tslint:disable-next-line:no-any
    ) as any;
  }

  if ((found as Cell).rows) {
    (found as Cell).rows = (found as Cell).rows.map(
      (r: Row): string => r.id
      // tslint:disable-next-line:no-any
    ) as any;
  }

  return found;
};
