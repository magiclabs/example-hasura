import { ThemeProvider, ToastProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider root>
      <ToastProvider position={'top-end'}>
        <Component {...pageProps} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
