import { CellPlugin } from '@react-page/editor';
import dynamic from 'next/dynamic';
import React from 'react';
// lazy load to keep initial bundle small
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SyntaxHighlighter = dynamic<any>(() =>
  import('react-syntax-highlighter').then((h) => h.Prism)
);
import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const codeSnippet: CellPlugin<{
  code: string;
  language: string;
}> = {
  Renderer: ({ data }) =>
    data?.code ? (
      <SyntaxHighlighter wrapLongLines language={data.language} style={style}>
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
