
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
        <div>
          <p>
            Welcome to our CPSC 304 Project
          </p>
          <p>
            Excited to ship something?
          </p>
          <p>
            Normally this app would be full with a lot of features... but 
            there wasn't enough time to make a fully featured webapp in the 
            given time frame.
          </p>
          <p>
            To get started, log-in!
          </p>
        </div>
      </Header>
    </div>
  );
}
