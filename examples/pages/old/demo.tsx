import type { Options, Value, Value_v0 } from '@react-page/editor';
import Editor from '@react-page/editor';

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { cellPlugins } from '../../plugins/cellPlugins';
import contents from '../../sampleContents/v0';
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
  const [value, setValue] = useState<Value_v0 | Value>(contents[0]);

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        onChange={setValue}
        languages={LANGUAGES}
      />
    </PageLayout>
  );
}
