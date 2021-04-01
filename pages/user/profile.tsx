import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Header from '../../components/Header';
import { UserContext } from 'components/UserState';


export default function Home(): JSX.Element {

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }
      const resp = await fetch('/api/profile', {
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
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Profile">
        { JSON.stringify(data) }
      </Header>
    </div>
  );
}
