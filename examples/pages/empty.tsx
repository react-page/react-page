import Editor, { Value } from '@react-page/editor';

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

export default function Empty() {
  const [value, setValue] = useState<Value>(null);

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
