import React from 'react';
import type { CellPlugin, Value } from '@react-page/editor';
import Editor, { createValue } from '@react-page/editor';
import slate from '@react-page/plugins-slate';

import PageLayout from '../../components/PageLayout';

const stretchy: CellPlugin<{ stretch: boolean }> = {
  id: 'stretch',
  title: 'stretching cell',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        stretch: {
          type: 'boolean',
          default: true,
        },
      },
    },
  },
  Renderer: (props) => (
    <div
      style={{
        height: props.data.stretch ? '100%' : 'auto',
        border: '2px solid red',
        padding: 5,
      }}
    >
      {props.data.stretch ? 'stretch' : 'no stretch'}
    </div>
  ),
};
const theSlate = slate();
const cellPlugins = [theSlate, stretchy];

const VALUE = createValue(
  {
    rows: [
      {
        cells: [
          {
            plugin: theSlate.id,
            data: theSlate.createData((def) => ({
              children: [
                {
                  plugin: def.plugins.headings.h1,
                  children: ['hello'],
                },
                {
                  plugin: def.plugins.paragraphs.paragraph,
                  children: ['Cells can stretch using height: 100%'],
                },
                {
                  plugin: def.plugins.paragraphs.paragraph,
                  children: ['They will even out the current row'],
                },
              ],
            })),
          },
          {
            plugin: stretchy.id,
            data: {
              stretch: true,
            },
          },
          {
            plugin: stretchy.id,
            data: {
              stretch: true,
            },
          },
          {
            plugin: stretchy.id,
            data: {
              stretch: false,
            },
          },
        ],
      },
    ],
  },
  { cellPlugins, lang: 'default' }
);
const stretchCells = () => {
  const [value, setValue] = React.useState<Value>(VALUE);

  return (
    <PageLayout>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </PageLayout>
  );
};

export default stretchCells;
