import React, { useState } from 'react';

import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

import slate from '@react-page/plugins-slate';

import PageLayout from '../../components/PageLayout';
import contactForm from '../../plugins/contactForm';

const cellPlugins = [slate(), contactForm];

const SAMPLE_VALUE: Value = {
  id: '89wod5',
  rows: [
    {
      id: '3bcnfl',
      cells: [
        {
          id: '6x4oik',
          size: 12,
          plugin: {
            id: 'contact-form',
            version: 1,
          },
          dataI18n: {
            default: {
              recipientId: 'recipient-1',
              fields: [
                {
                  label: 'Firstname',
                  type: 'text',
                  name: 'firstname',
                  required: true,
                },
                {
                  label: 'Lastname',
                  type: 'text',
                  name: 'lastname',
                  required: true,
                },
                {
                  label: 'Zip',
                  type: 'number',
                  name: 'zipcode',
                  required: false,
                },

                {
                  label: 'E-Mail',
                  type: 'string',
                  name: 'email',
                  required: true,
                },
              ],
            },
          },
          rows: [],
          inline: null,
        },
      ],
    },
  ],
  version: 1,
};
export default function SimpleExample() {
  const [value, setValue] = useState<Value>(SAMPLE_VALUE);

  return (
    <PageLayout>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </PageLayout>
  );
}
