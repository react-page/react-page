import Editor, { Value } from '@react-page/editor';

import React, { useState } from 'react';
import { cellPlugins } from '../plugins/cellPlugins';
import contents from '../sampleContents';
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
  const [value, setValue] = useState<Value>(contents[0]);

  return (
    <>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </>
  );
}
