import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

export default function Login(): JSX.Element {
  
  const [data, setData] = React.useState(null)

  React.useEffect(() => {

    async function fetchData() {
      const resp = await fetch('/api/courier', {
        method: 'GET'
      });

      const data = await resp.json();

      setData(data.result);
    }

    fetchData();

  }, []);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Couriers)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Courier ID (cid)</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.nid}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
        </Grid>
      </Header>
    </>
  );
}
