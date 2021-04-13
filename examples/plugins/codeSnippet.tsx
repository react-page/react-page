import type { CellPlugin } from '@react-page/editor';
import dynamic from 'next/dynamic';
import React from 'react';

// lazy load to keep initial bundle small
const CodeSnippet = dynamic(() => import('../components/CodeSnippet'));

const codeSnippet: CellPlugin<{
  code: string;
  language: string;
}> = {
  Renderer: ({ data }) =>
    data?.code ? (
      <CodeSnippet language={data.language} code={data.code} />
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
