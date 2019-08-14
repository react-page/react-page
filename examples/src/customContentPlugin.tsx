import { createContentPlugin } from '@react-page/create-plugin-materialui';
import React from 'react';

export default () =>
  createContentPlugin({
    // tslint:disable-next-line:no-any
    Renderer: ({ state }: any) => (
      <div>
        <p>I am a custom plugin</p>
        <p>this is my configuration:</p>
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
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        age: {
          description: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
      },
      required: ['firstName', 'lastName'],
    },
  });
