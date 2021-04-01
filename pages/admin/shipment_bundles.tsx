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

      const resp = await fetch('/api/admin/bundle', {
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

      <Header title="Admin (Shimpment Bundles)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bundle ID (sbid)</TableCell>
                      <TableCell>Customer ID (cid)</TableCell>
                      <TableCell align="right">recipient_name</TableCell>
                      <TableCell align="right">weight</TableCell>
                      <TableCell align="right">shipping_date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.sbid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell align="right">{row.recipient_name}</TableCell>
                        <TableCell align="right">{row.weight}</TableCell>
                        <TableCell align="right">{row.shipping_date}</TableCell>
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
