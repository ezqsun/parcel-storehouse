import Head from 'next/head';
import Header from '../../components/Header';

export default function Register(): JSX.Element {
  
  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Register"/>
    </div>
  );
}
