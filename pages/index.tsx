
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
//import { UserContext } from '../components/UserState';


export default function Home(): JSX.Element {
  
  
  //const [state, dispatch] = React.useContext(UserContext);

  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Dashboard">
      </Header>
    </div>
  );
}
