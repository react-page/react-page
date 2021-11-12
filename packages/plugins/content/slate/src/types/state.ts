import type { Node, Range } from 'slate';

export type SlateState = {
  slate: Node[];
  selection?: Range | null;
};
