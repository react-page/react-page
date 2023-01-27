import React from 'react';
import '../styles/styles.css';
import '@react-page/editor/lib/index.css';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
// import plugin css. We recommend to do that
// where you import the plugin itself,
// but there is a problem currently preventing us from do so,
// but that only applies to this example project
// see https://github.com/vercel/next.js/issues/19717
import '@react-page/plugins-background/lib/index.css';
import '@react-page/plugins-html5-video/lib/index.css';
import '@react-page/plugins-spacer/lib/index.css';
import '@react-page/plugins-video/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';

import createEmotionCache from '../utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
