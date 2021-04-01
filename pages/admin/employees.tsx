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

      const resp = await fetch('/api/admin/employees', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });

      const data = await resp.json();

      setData(data);
    }

    fetchData();

  }, [state]);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Branches)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID (eid)</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Position</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.result.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.eid}
                        </TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.phone_number}</TableCell>
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
