import { Button } from '@mui/material';
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import React, { useState } from 'react';
import './styles/styles.css';
import '@react-page/editor/lib/index.css';
import { CacheProvider } from '@emotion/react';
import '@react-page/plugins-background/lib/index.css';
import '@react-page/plugins-html5-video/lib/index.css';
import '@react-page/plugins-spacer/lib/index.css';
import '@react-page/plugins-video/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import 'katex/dist/katex.min.css';
import { cellPlugins } from './plugins/cellPlugins';

import createEmotionCache from './utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { demo } from './sampleContents/demo';

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

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();
function MyApp({ emotionCache = clientSideEmotionCache }) {
  const [value, setValue] = useState<Value | null>(demo);
  const reset = () => setValue(demo);
  const clear = () => setValue(null);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Button onClick={reset}>Reset</Button>
          <Button onClick={clear}>clear</Button>
          <Editor
            cellPlugins={cellPlugins}
            value={value}
            lang={LANGUAGES[0].lang}
            onChange={setValue}
            languages={LANGUAGES}
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
