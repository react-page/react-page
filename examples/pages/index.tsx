import type { Options, Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import { demo } from '../sampleContents/demo';
import React, { useState } from 'react';
import { cellPlugins } from '../plugins/cellPlugins';
import PageLayout from '../components/PageLayout';
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

export default function Home() {
  const [value, setValue] = useState<Value>(demo);
  const reset = () => setValue(demo);

  return (
    <PageLayout>
      <Editor
        cellPlugins={cellPlugins}
        value={value}
        lang={LANGUAGES[0].lang}
        onChange={setValue}
        languages={LANGUAGES}
      />
      <Button onClick={reset}>Reset</Button>
    </PageLayout>
  );
}
