import type { Value } from '@react-page/editor';
import Editor, { defaultThemeOptions } from '@react-page/editor';
import { demo } from '../../sampleContents/demo';
import React, { useState } from 'react';
import { cellPlugins } from '../../plugins/cellPlugins';
import PageLayout from '../../components/PageLayout';
import { Button, createTheme } from '@mui/material';
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

const darkTheme = createTheme({
  ...defaultThemeOptions,
  palette: { mode: 'dark' },
});
export default function Dark() {
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
        uiTheme={darkTheme}
      />
      <Button onClick={reset}>Reset</Button>
    </PageLayout>
  );
}
