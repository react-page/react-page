import { CellPlugin } from '@react-page/editor';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const codeSnippet: CellPlugin<{
  code: string;
  language: string;
}> = {
  Renderer: ({ data }) =>
    data?.code ? (
      <SyntaxHighlighter language={data.language} style={dark}>
        {data.code}
      </SyntaxHighlighter>
    ) : null,
  id: 'code-snippet',
  title: 'Code snippet',
  description: 'A code snippet',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        language: {
          type: 'string',
        },
        code: {
          type: 'string',
          uniforms: {
            multiline: true,
          },
        },
      },
      required: ['code'],
    },
  },
};
export default codeSnippet;
