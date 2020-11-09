import { CellPlugin } from '@react-page/editor';
import React from 'react';

const customContentPlugin: CellPlugin<{
  title: string;
  firstName: string;
  lastName: string;
  age: number;
}> = {
  Renderer: ({ data }) => (
    <div>
      <h3>{data.title}</h3>
      <p>Firstname: {data.firstName}</p>
      <p>Lastname: {data.lastName}</p>
      <p>Age: {data.age}</p>
    </div>
  ),
  id: 'custom-content-plugin',
  title: 'Custom content plugin',
  description: 'Some custom content plugin',
  version: 1,
  controls: {
    type: 'autoform',
    schema: {
      properties: {
        title: {
          type: 'string',
          default: 'I am a custom plugin, this is my configuration',
        },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        age: {
          title: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['firstName', 'lastName'],
    },
  },
};
export default customContentPlugin;
