import { Migration } from '@react-page/editor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeLeaves = (nodes: Array<any>) => {
  if (!nodes) {
    return [];
  }
  const cleanedNodes = nodes.reduce((acc, node) => {
    if (node.leaves) {
      // we don't need the node itself, as we exepct it to be a text node
      return [
        ...acc,
        ...node.leaves.map((leave) => ({
          ...leave,
          object: 'text',
        })),
      ];
    } else {
      const cleanedNode = node.nodes
        ? {
            ...node,
            nodes: removeLeaves(node.nodes),
          }
        : node;
      return [...acc, cleanedNode];
    }
  }, []);

  return cleanedNodes;
};
const migration = new Migration({
  toVersion: '0.0.3',
  fromVersionRange: '^0.0.2',
  migrate: (state) => {
    if (!state) {
      return {};
    }
    const newState =
      state.serialized && state.serialized.document
        ? {
            ...state,
            serialized: {
              ...state.serialized,
              document: {
                ...state.serialized.document,
                nodes: removeLeaves(state.serialized.document.nodes),
              },
            },
          }
        : state;

    return newState;
  },
});

export default migration;
