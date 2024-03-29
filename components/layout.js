import Head from 'next/head';
import Header from './header';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Magic</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Header />
    <main>
      <div className='container'>{children}</div>
    </main>
    <style jsx global>{`
      * {
        outline: none;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 0 10px;
      }
    `}</style>
  </>
);

export default Layout;
