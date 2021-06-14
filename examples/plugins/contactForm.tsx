import type { CellPlugin } from '@react-page/editor';
import dynamic from 'next/dynamic';
import React from 'react';
import type { Field } from '../components/ContactFormExample';

// lazy load to keep initial bundle small
const ContactFormExample = dynamic(
  () => import('../components/ContactFormExample')
);

const contactForm: CellPlugin<{
  fields: Field[];
  recipientId: string;
}> = {
  Renderer: ({ data }) => (
    <ContactFormExample fields={data.fields} recipientId={data.recipientId} />
  ),
  id: 'contact-form',
  title: 'Contact form',
  description: 'A simple, configurable contactform',
  version: 1,
  controls: {
    type: 'autoform',
    columnCount: 1,
    schema: {
      properties: {
        recipientId: {
          type: 'string',
          enum: ['recipient-1', 'recipient-2', 'recipient-3'],
        },
        fields: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
              },
              type: {
                type: 'string',
                enum: ['text', 'number'],
              },
              name: {
                type: 'string',
              },
              required: {
                type: 'boolean',
              },
            },
          },
        },
      },
      required: ['fields', 'recipientId'],
    },
  },
};
export default contactForm;
