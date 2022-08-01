import type { Options, Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import { demo } from '../sampleContents/demo';
import React, { useEffect, useState } from 'react';
import { cellPlugins } from '../plugins/cellPlugins';
import PageLayout from '../components/PageLayout';
import { Button } from '@mui/material';
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
  const reset = () => setValue(demo);
  useEffect(() => {
    console.info('value', JSON.stringify(value, null, 2));
  }, [value]);

  console.info('Home: cellPlugins', cellPlugins);

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
