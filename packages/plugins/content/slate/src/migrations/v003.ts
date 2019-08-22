import { Migration } from '@react-page/core/lib/service/plugin/classes';

// tslint:disable-next-line:no-any
const removeLeaves = (nodes: Array<any>) => {
  if (!nodes) {
    return [];
  }
  const cleanedNodes = nodes.reduce((acc, node) => {
    if (node.leaves) {
      // we don't need the node itself, as we exepct it to be a text node
      return [
        ...acc,
        ...node.leaves.map(leave => ({
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
  migrate: state => {
    const newState =
      state && state.serialized && state.serialized.document
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
        : null;
    console.log(newState);
    return newState;
  },
});

export default migration;
