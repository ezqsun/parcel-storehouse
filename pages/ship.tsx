
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';

export default function Ship(): JSX.Element {

  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Ship">
      </Header>
    </div>
  );
}
