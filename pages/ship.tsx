
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Header from '../components/Header';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Home(): JSX.Element {

  const classes = useStyles();

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
