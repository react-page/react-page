import type { Value, Options } from '@react-page/editor';
import Editor from '@react-page/editor';

import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { cellPlugins } from '../plugins/cellPlugins';

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

export default function Empty() {
  const [value, setValue] = useState<Value>(null);

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
