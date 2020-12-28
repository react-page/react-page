import Editor, { Options, Value } from '@react-page/editor';
import { demo } from '../sampleContents/demo';
import React, { useState } from 'react';
import { cellPlugins } from '../plugins/cellPlugins';
import PageLayout from '../components/PageLayout';

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

export default function Home() {
  const [value, setValue] = useState<Value>(demo);

  return (
    <PageLayout>
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
