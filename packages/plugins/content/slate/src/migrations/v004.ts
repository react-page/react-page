import { Migration } from '@react-page/core/lib/service/plugin/classes';
import isEmpty from 'lodash.isempty';
import { Element, Node, Text } from 'slate';
// this is for slate 0.50.0
// tslint:disable-next-line:no-any

type OldMark = {
  object: 'mark';
  type: string;
  // tslint:disable-next-line:no-any
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
  // tslint:disable-next-line:no-any
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
    type: node.type,
    ...(node.data ?? {}),
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
  migrate: state => {
    if (!state) {
      return {};
    }

    const result = state.serialized?.document?.nodes?.map(migrateNode) ?? [];

    return {
      slate: result,
    };
  },
});

export default migration;
