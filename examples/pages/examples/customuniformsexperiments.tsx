/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { AutoFields, ColorPickerField } from '@react-page/editor';
// The editor core
import type { Value, CellPlugin } from '@react-page/editor';
import Editor, { createValue } from '@react-page/editor';

import slate from '@react-page/plugins-slate';

import PageLayout from '../../components/PageLayout';
import { Button } from '@mui/material';

const customContentPluginWithSpecialForm: CellPlugin<{
  title: string;
  description: string;
}> = {
  Renderer: ({ data }) => (
    <div>
      <h3>Name</h3>
      <p>title: {data.title}</p>
      <p>description: {data.description}</p>
    </div>
  ),
  id: 'custom-content-plugin-with-custom-actions',
  title: 'Custom content plugin',
  description: 'Some custom content plugin with special actions',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      },
      required: [],
    },
    Content: ({ nodeId, onChange, remove }) => (
      <div>
        <p>node {nodeId}</p>

        <Button
          variant="outlined"
          onClick={() => {
            onChange(
              {
                title: 'Good day, sir',
              },
              {
                lang: 'en',
              }
            );
          }}
        >
          set title in English to "Good day, sir"
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onChange(
              {
                title: 'Guten Tag',
              },
              {
                lang: 'de',
              }
            );
          }}
        >
          set title in German to "Guten Tag"
        </Button>
        <AutoFields />

        <Button variant="outlined" onClick={remove} color="error">
          Remove this cell
        </Button>
      </div>
    ),
  },
};

const cellPlugins = [slate(), customContentPluginWithSpecialForm];

const INITIAL_VALUE = createValue(
  {
    rows: [
      [
        {
          plugin: customContentPluginWithSpecialForm,
        },
      ],
    ],
  },
  {
    cellPlugins,
    lang: 'default',
  }
);
export default function CustomFormLayout() {
  const [value, setValue] = useState<Value>(INITIAL_VALUE);

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        languages={[
          {
            label: 'English',
            lang: 'en',
          },
          {
            label: 'Deutsch',
            lang: 'de',
          },
        ]}
      />
    </PageLayout>
  );
}
