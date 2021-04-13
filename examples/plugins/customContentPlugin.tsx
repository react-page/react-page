import type { CellPlugin } from '@react-page/editor';
import { ColorPickerField } from '@react-page/editor';
import React from 'react';

const customContentPlugin: CellPlugin<{
  title: string;
  firstName: string;
  lastName: string;
  age: number;
  style: {
    backgroundColor: string;
    textColor: string;
    padding: number;
  };
}> = {
  Renderer: ({ data }) => (
    <div
      style={{
        backgroundColor: data.style?.backgroundColor,
        color: data?.style?.textColor,
        padding: data?.style?.padding,
      }}
    >
      <h3>{data.title}</h3>
      <p>Firstname: {data.firstName}</p>
      <p>Lastname: {data.lastName}</p>
      <p>Age: {data.age}</p>
    </div>
  ),
  id: 'custom-content-plugin',
  title: 'Custom content plugin',
  description: 'Some custom content plugin with multiple controls',
  version: 1,
  controls: [
    {
      title: 'Default config',
      controls: {
        type: 'autoform',
        schema: {
          properties: {
            title: {
              type: 'string',
              default:
                'I am a custom plugin with multiple controls, this is my configuration',
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
    },
    {
      title: 'Styling',
      controls: {
        type: 'autoform',
        schema: {
          type: 'object',
          required: [],
          properties: {
            style: {
              type: 'object',
              required: [],
              properties: {
                backgroundColor: {
                  type: 'string',
                  default: 'white',
                  uniforms: {
                    component: ColorPickerField,
                  },
                },
                textColor: {
                  type: 'string',
                  default: 'black',
                  uniforms: {
                    component: ColorPickerField,
                  },
                },

                padding: {
                  type: 'number',
                  default: 10,
                },
              },
            },
          },
        },
      },
    },
  ],
};
export default customContentPlugin;
