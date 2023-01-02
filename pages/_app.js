import Head from 'next/head';
import Layout from '../components/layout/layout';
import { CartContextProvider } from '../store/cart-context';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Head>
          <title>Food Ordering Tool</title>
          <meta
            name='description'
            content='Food Ordering Tool - Created By KienLTT'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}
