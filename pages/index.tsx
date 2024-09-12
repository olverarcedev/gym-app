import Head from 'next/head';
import HomePage from './home/homePage';
import HeaderComponent from '../components/unit-components/headerComponent';
import { Provider } from 'react-redux';
import { makeStore } from '../redux/store';

export default function Home() {
  const store = makeStore();
  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>UtaSport</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <HeaderComponent />
          <HomePage />
        </main>
      </div>
    </Provider>
  );
}
