import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { CircularProgress, Grid, LinearProgress } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import InfoCard from 'components/InfoCard';

export default function Login(): JSX.Element {

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null)

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }

      const resp = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });

      const data = await resp.json();
      
      setData(data.result);
    }

    fetchData();

  }, [state]);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin">
        <Grid container>
          {
            data && 
            <>
              {
                data.map((info) => 
                  <div style={{ padding: '0px 10px' }} key={ info.name }>
                    <InfoCard title={ info.name } content={info.value}  href={ '/admin/' + info.name } />
                  </div>
                )
              }
            </>
          }
        </Grid>
      </Header>
    </>
  );
}
