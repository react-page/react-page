import { createContentPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';

export default createContentPlugin<{
  title: string;
  firstName: string;
  lastName: string;
  age: number;
}>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Renderer: ({ state }) => (
    <div>
      <h3>{state.title}</h3>
      <p>Firstname: {state.firstName}</p>
      <p>Lastname: {state.lastName}</p>
      <p>Age: {state.age}</p>
    </div>
  ),
  name: 'custom-content-plugin',
  text: 'Custom content plugin',
  description: 'Some custom content plugin',
  version: '0.0.1',
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
});
