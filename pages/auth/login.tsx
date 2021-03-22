import Head from 'next/head';
import Header from '../../components/Header';
import React, { FormEvent } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import Image from 'next/image';
import zIndex from '@material-ui/core/styles/zIndex';

export default function Login(): JSX.Element {
  
  const handleLogin = (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();

  }

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div  style={{zIndex: -1, position: 'absolute', height: '100vh', width: '100vw'}}>
        <Image src="/stock-img.jpg" layout="fill"/>
      </div>
      <Header title="Login"/>
      <Grid container>
        <Grid item xs={4} >
            <Grid container style={{backgroundColor:'white', height: 'calc(100vh - 64px)'}} justify="center" alignContent="center" direction="column">

                <form style={{width: '60%'}}>
                    <TextField label="Email" variant="outlined" fullWidth={true} />
                    <div style={{padding: '10px'}}/>
                    <TextField label="Password" type="password" variant="outlined" fullWidth={true} />
                    <div style={{padding: '10px'}}/>
                    <Button variant="contained" color="primary" fullWidth>Login</Button>
                </form>
            </Grid>
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </>
  );
}
