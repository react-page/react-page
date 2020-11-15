import Editor, { EditableType } from '@react-page/editor';

import React, { useState } from 'react';
import { plugins } from '../plugins/plugins';
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
  const [value, setValue] = useState<EditableType>(contents[0]);

  return (
    <>
      <Editor
        plugins={plugins}
        value={value}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </>
  );
}
