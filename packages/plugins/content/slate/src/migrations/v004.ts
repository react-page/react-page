import { Migration } from '@react-page/editor';
import isEmpty from 'lodash.isempty';
import { Element, Node, Text } from 'slate';
// this is for slate 0.50.0
// eslint-disable-next-line @typescript-eslint/no-explicit-any

type OldMark = {
  object: 'mark';
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any };
};

type OldTextNode = {
  object: 'text';
  text: string;
  marks?: OldMark[];
};
type OldElementNode = {
  object: 'block' | 'inline';
  type: string;
  isVoid: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
  nodes: OldNode[];
};

type OldNode = OldElementNode | OldTextNode;

const migrateTextNode = (oldNode: OldTextNode): Text => {
  return {
    text: oldNode.text,
    ...(oldNode.marks?.reduce(
      (acc, mark) => ({
        ...acc,
        [mark.type]: !isEmpty(mark.data) ? mark.data : true,
      }),
      {}
    ) ?? {}),
  };
};

const migrateElementNode = (node: OldElementNode): Element => {
  return {
    data: node.data ?? {},
    type: node.type,
    children: node.nodes?.map(migrateNode) ?? [],
  };
};
const migrateNode = (oldNode: OldNode): Node => {
  if (oldNode.object === 'text') {
    return migrateTextNode(oldNode);
  } else {
    return migrateElementNode(oldNode);
  }
};
const migration = new Migration({
  toVersion: '0.0.4',
  fromVersionRange: '^0.0.3',
  migrate: (state) => {
    if (!state) {
      return {};
    }

    const slate = state.serialized?.document?.nodes?.map(migrateNode) ?? [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = { slate };
    if (state.importFromHtml) {
      result.importFromHtml = state.importFromHtml;
    }
    return result;
  },
});

export default migration;
