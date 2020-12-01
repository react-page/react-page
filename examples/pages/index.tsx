import Editor, { Value } from '@react-page/editor';
import { demo } from '../sampleContents/demo';
import React, { useState } from 'react';
import { cellPlugins } from '../plugins/cellPlugins';

const LANGUAGES = [
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
    <>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        lang={LANGUAGES[0].lang}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </>
  );
}
