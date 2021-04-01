import Head from 'next/head';
import Header from '../../components/HeaderOnly';
import React, { FormEvent } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import { useRouter } from 'next/router';
import { AuthUser } from 'contexts/user-reducer';

export default function Login(): JSX.Element {

  const [state, dispatch] = React.useContext(UserContext);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const resp = await fetch('/api/auth/login', {
      body: '{}',
      headers: {
        'username': (e.target as any).elements.email.value,
        'password': (e.target as any).elements.pass.value
      },
      method: 'POST'
    });

    const data = await resp.json();
    console.log({ resp, data });

    if (resp.status === 200) {
      dispatch({
        type: 'LOGIN',
        authResult: data
      });
      router.push('/');
    } else {

    }
  };

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ zIndex: -1, position: 'absolute', height: '100vh', width: '100vw' }}>
        <Image src="/stock-img.jpg" layout="fill" />
      </div>
      <Header title="Login" />
      <main>
        <Grid container>
          <Grid item xs={4} >
            <Grid container style={{ backgroundColor: 'white', height: '100vh' }} justify="center" alignContent="center" direction="column">

              <form style={{ width: '60%' }} onSubmit={handleLogin}>
                <TextField id="email" name="email" label="Email" variant="outlined" fullWidth={true} />
                <div style={{ padding: '10px' }} />
                <TextField id="pass" name="pass" label="Password" type="password" variant="outlined" fullWidth={true} />
                <div style={{ padding: '10px' }} />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </main>
    </>
  );
}
