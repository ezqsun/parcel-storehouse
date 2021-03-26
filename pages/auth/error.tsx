import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';

export default function Error(): JSX.Element {
  
  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Error"/>
      
    </div>
  );
}
