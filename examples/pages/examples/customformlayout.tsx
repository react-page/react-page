import React, { useState } from 'react';
import { AutoFields, ColorPickerField } from '@react-page/editor';
// The editor core
import type { Value, CellPlugin } from '@react-page/editor';
import Editor, { createValue } from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
// import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';

import PageLayout from '../../components/PageLayout';

const customContentPluginWithSpecialForm: CellPlugin<{
  firstName: string;
  lastName: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  age: number;
}> = {
  Renderer: ({ data }) => (
    <div>
      <h3>Name</h3>
      <p>Firstname: {data.firstName}</p>
      <p>Lastname: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <h3>Adress</h3>
      <p>{data.street}</p>
      <p>{data.lastName}</p>
      <p>Age: {data.age}</p>
    </div>
  ),
  id: 'custom-content-plugin-with-custom-layout',
  title: 'Custom content plugin',
  description: 'Some custom content plugin with multiple controls',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        street: { type: 'string' },
        zip: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },

        age: {
          title: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
      },
      required: [],
    },
    Content: () => (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 20 }}>
          <p>Personal information:</p>
          <AutoFields fields={['firstName', 'lastName', 'age']} />
        </div>
        <div style={{ flex: 1 }}>
          <p>Adress:</p>
          <AutoFields omitFields={['firstName', 'lastName', 'age']} />
        </div>
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
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </PageLayout>
  );
}
