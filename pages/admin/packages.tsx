import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { CircularProgress, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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

      const resp = await fetch('/api/admin/packages', {
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

  const rows = [];

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Customers)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <p>
                Note: To add a new customer, register a new account
              </p>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Package ID (pid)</TableCell>
                      <TableCell>Customer ID (pid)</TableCell>
                      <TableCell align="right">customer_name</TableCell>
                      <TableCell align="right">processed_date</TableCell>
                      <TableCell align="right">tracking_number</TableCell>
                      <TableCell align="right">ordered_date</TableCell>
                      <TableCell align="right">courier_name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.pid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell align="right">{row.customer_name}</TableCell>
                        <TableCell align="right">{row.processed_date}</TableCell>
                        <TableCell align="right">{row.tracking_number}</TableCell>
                        <TableCell align="right">{row.ordered_date}</TableCell>
                        <TableCell align="right">{row.courier_name}</TableCell>
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
