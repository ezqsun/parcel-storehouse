import Head from 'next/head';
import Header from '../../components/Header';
import React, { FormEvent } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import { useRouter } from 'next/router';
import { AuthUser } from 'contexts/user-reducer';

export default function Login(): JSX.Element {

  const [ state, dispatch ] = React.useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Users">
      </Header>
      <Grid container>
        
      </Grid>
    </>
  );
}
