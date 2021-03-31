import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { Grid } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';

export default function Login(): JSX.Element {

  const [ state, dispatch ] = React.useContext(UserContext);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div  style={{zIndex: -1, position: 'absolute', height: '100vh', width: '100vw'}}>
        <Image src="/stock-img.jpg" layout="fill"/>
      </div>
      <Header title="Admin">
      </Header>
      <Grid container>
        
      </Grid>
    </>
  );
}
