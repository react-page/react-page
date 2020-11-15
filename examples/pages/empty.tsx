import Editor, { EditableType } from '@react-page/editor';

import React, { useState } from 'react';
import { plugins } from '../plugins/plugins';

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
  const [value, setValue] = useState<EditableType>(null);

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
