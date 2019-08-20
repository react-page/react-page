import { Value, BlockJSON } from 'slate';
import DEFAULT_NODE from '../plugins/DEFAULT_NODE';

export default () => ({
  editorState: Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: DEFAULT_NODE,
          nodes: [
            {
              object: 'text',
              text: '',
            },
          ],
        } as BlockJSON,
      ],
    },
  }),
});
