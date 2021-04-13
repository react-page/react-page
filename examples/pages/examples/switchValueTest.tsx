import type { Options, Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import React, { useState } from 'react';
import { cellPlugins } from '../../plugins/cellPlugins';
import PageLayout from '../../components/PageLayout';
import { Button } from '@material-ui/core';
const LANGUAGES: Options['languages'] = [
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'de',
    label: 'Deutsch',
  },
];

const VALUE_1 = {
  id: '2390df',
  version: 1,
  rows: [
    {
      id: '4c7d90',
      cells: [
        {
          id: '95d678',
          size: 12,
          plugin: { id: 'ory/editor/core/content/slate', version: 1 },
          dataI18n: {
            en: {
              slate: [
                {
                  children: [{ text: 'Next Level Content Editing' }],
                  type: 'HEADINGS/HEADING-TWO',
                  data: { align: 'center' },
                },
                {
                  children: [{ text: 'ReactPage' }],
                  type: 'HEADINGS/HEADING-ONE',
                  data: { align: 'center' },
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
};

const VALUE_2 = {
  id: '2590df',
  version: 1,
  rows: [
    {
      id: '4c7d90',
      cells: [
        {
          id: '95d678',
          size: 12,
          plugin: { id: 'ory/editor/core/content/slate', version: 1 },
          dataI18n: {
            en: {
              slate: [
                {
                  children: [{ text: 'Another text' }],
                  type: 'HEADINGS/HEADING-TWO',
                  data: { align: 'center' },
                },
                {
                  children: [{ text: 'Something' }],
                  type: 'HEADINGS/HEADING-ONE',
                  data: { align: 'center' },
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
};

export default function Home() {
  const [value, setValue] = useState<Value>(VALUE_1);

  const switchTo2 = () => setValue(VALUE_2);
  const switchTo1 = () => setValue(VALUE_1);

  return (
    <PageLayout>
      <Button onClick={switchTo1}>switch to 1</Button>
      <Button onClick={switchTo2}>switch to 2</Button>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        lang={LANGUAGES[0].lang}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </PageLayout>
  );
}
