import '../styles/globals.css';
import '@react-page/plugins-background/lib/index.css';
import '@react-page/plugins-html5-video/lib/index.css';
import '@react-page/plugins-video/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-spacer/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
