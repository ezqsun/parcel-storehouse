import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Header from '../../components/Header';
import { UserContext } from 'components/UserState';
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

export default function Home(): JSX.Element {

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }
      const resp = await fetch('/api/profile/shipped-packages', {
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
      <Header title="My Shipped Packages" loading={!data}>
        {
          data &&
          <>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Tracking number</TableCell>
                    <TableCell align="right">Processed date</TableCell>
                    <TableCell align="right">Ordered date</TableCell>
                    <TableCell align="right">Courier name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.pid}>
                      <TableCell align="right">{row.tracking_number}</TableCell>
                      <TableCell align="right">{row.processed_date}</TableCell>
                      <TableCell align="right">{row.ordered_date}</TableCell>
                      <TableCell align="right">{row.courier_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }
        {
          data && data.length === 0 &&
          <>
            <br />
            <br />
            <br />
            <p style={{ textAlign: 'center' }}>
              It appears that you do not have any shipped goods
            </p>
          </>
        }
      </Header>
    </div>
  );
}

